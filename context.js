function getNumStr(num) {
	var s = num.toFixed(4);
	while (s[s.length - 1] == '0') s = s.slice(0, s.length - 1);
	if (s[s.length - 1] == '.') s = s.slice(0, s.length - 1);
	return s;
}

function getMain(stat) {
	if (stat == "hp") return 4780;
	if (stat == "atk") return 311;

	if (stat == "atk%") return 0.466;
	if (stat == "def%") return 0.583;
	if (stat == "hp%") return 0.466;
	if (stat == "em") return 187.5;

	if (stat == "er") return 0.518;

	if (stat == "anemo%") return 0.466;
	if (stat == "geo%") return 0.466;
	if (stat == "electro%") return 0.466;
	if (stat == "dendro%") return 0.466;
	if (stat == "hydro%") return 0.466;
	if (stat == "pyro%") return 0.466;
	if (stat == "cryo%") return 0.466;
	if (stat == "phys%") return 0.583;

	if (stat == "cr") return 0.311;
	if (stat == "cd") return 0.622;
	if (stat == "heal%") return 0.359;

	return 0;
}

function getSide(stat) {
	if (stat == "atk%") return 0.0495;
	if (stat == "def%") return 0.0619;
	if (stat == "hp%") return 0.0495;
	if (stat == "em") return 19.81;
	if (stat == "er") return 0.0551;
	if (stat == "cr") return 0.033;
	if (stat == "cd") return 0.066;

	return 0;
}

function isCommonStat(stat) {
	return stat == "atk%" || stat == "def%" || stat == "hp%" || stat == "em";
}

function isSupplyStat(stat, supply) {
	for (var i = 0; i < supply.length; i++) {
		if (stat == supply[i]) return true;
	}
	return false;
}

function getCommonStat(maintype, sidetype, supply, fallback) {
	if (isCommonStat(maintype) || isSupplyStat(maintype, supply)) return maintype;
	for (var i = 0; i < sidetype.length; i++) {
		if (isCommonStat(sidetype[i]) || isSupplyStat(sidetype[i], supply)) return sidetype[i];
	}
	return fallback;
}

function getStd(char, element, cons, weapon, refine, crit, set_1, set_2, maintype, sidetype, options) {
	var basecr = crit[0], basecd = crit[1];
	var weapon_is_70 = false;
	for (var i = 0; i < weapon_70.length; i++) {
		if (weapon_70[i] == weapon) weapon_is_70 = true;
	}
	var char_str = char + " char lvl=90/90 talent=9,9,9 cons=" + cons + ";";
	var weapon_str = char + " add weapon=\"" + weapon + "\" lvl=" + (weapon_is_70 ? "70/70" : "90/90") + " refine=" + refine + ";";
	var set_str;
	if (set_1 == "") {
		if (set_2 == "") {
			set_str = ""
		} else {
			set_str = char + " add set=\"" + set_2 + "\" count=4;\n";
		}
	} else {
		if (set_2 == "") {
			set_str = char + " add set=\"" + set_1 + "\" count=4;\n";
		} else {
			set_str = char + " add set=\"" + set_1 + "\" count=2;\n" + char + " add set=\"" + set_2 + "\" count=2;\n";
		}
	}
	var mainstat, sidestat;
	var resultcr = 0, resultcd = 0;
	var sand = options.isERSand ? "er" : getCommonStat(maintype, sidetype, ["er"], "er");
	var goblet = options.isPhys ? "phys%" : (options.isAttack ? element + "%" : getCommonStat(maintype, sidetype, [], element + "%"));
	var circlet = options.isHeal ? "heal%" : (options.isFav ? "cr" : getCommonStat(maintype, sidetype, ["cr", "cd"], "cr")); 
	mainstat =
		char + " add stats hp=4780 atk=311 " +
		sand + "=" + getNumStr(getMain(sand)) + " " +
		goblet + "=" + getNumStr(getMain(goblet)) + " ";
	if (options.iscrcd) {
		var score = basecr + basecd / 2 + 18 * 0.033 + 0.311;
		var circletcr = 0, circletcd = 0;
		var limit;
		if(char == "ganyu" && options.dualCryo) limit = 1;
		else if(element == "cryo" && options.dualCryo) limit = 0.9;
		else limit = 0.8;
		var sidecr = score / 2 - basecr;
		var sidecd = score - basecd;
		if (sidecr > 0.65) {
			sidecd += (sidecr - 0.65) * 2;
			sidecr = 0.65;
		}
		console.log(sidecr, sidecd);
		if (basecr + sidecr > limit){
			sidecd += (basecr + sidecr - limit) * 2;
			sidecr = limit - basecr;
		}
		console.log(sidecr, sidecd);
		if (sidecr < 0) {
			sidecr = 0;
			sidecd = 0.066 * 18 + 0.622;
		}
		console.log(sidecr, sidecd);
		if (sidecr * 2 > sidecd){
			mainstat += "cr=" + getNumStr(getMain("cr")) + ";";
			sidecr -= 0.311;
			circletcr = 0.311;
		} else {
			mainstat += "cd=" + getNumStr(getMain("cd")) + ";";
			sidecd -= 0.622;
			circletcd = 0.622;
		}
		console.log(sidecr, sidecd);
		sidestat = char + " add stats cr=" + getNumStr(sidecr) + " cd=" + getNumStr(sidecd);
		sidestat += " " + maintype + "=" + getNumStr(getSide(maintype) * 6);
		if (sidetype.length == 1) sidestat += " " + sidetype[0] + "=" + getNumStr(getSide(sidetype[0]) * 4);
		else {
			for (var i = 0; i < sidetype.length; i++) {
				sidestat += " " + sidetype[i] + "=" + getNumStr(getSide(sidetype[i]) * 3);
			}
		}
		sidestat += ";";
		resultcr = basecr + circletcr + sidecr;
		resultcd = basecd + circletcd + sidecd;
	} else {
		mainstat += circlet + "=" + getMain(circlet) + ";";
		var allowedArtifact = 0;
		var mainCount = 0;
		if(maintype != sand) allowedArtifact += 1;
		if(maintype != goblet) allowedArtifact += 1;
		if(maintype != circlet) allowedArtifact += 1;
		mainCount = 8 + allowedArtifact * 2;
		sidestat =
			char + " add stats " + maintype + "=" + getNumStr(getSide(maintype) * mainCount);
		if (sidetype.length >= 1) {
			sidestat += " " + sidetype[0] + "=" + getNumStr(getSide(sidetype[0]) * 6);
			if (sidetype.length == 2) sidestat += " " + sidetype[1] + "=" + getNumStr(getSide(sidetype[1]) * 4);
			else {
				for (var i = 1; i < sidetype.length; i++) {
					sidestat += " " + sidetype[i] + "=" + getNumStr(getSide(sidetype[i]) * 3);
				}
			}
		}
		sidestat += ";";
	}
	var result = char_str + "\n" + weapon_str + "\n" + set_str + mainstat + "\n" + sidestat + "\n\n"
	return [resultcr, resultcd, result];
}

function getCharExtraCrit(char, weapon) {
	var extras = [];
	for (var i = 0; i < crchars.length; i++) {
		if (crchars[i][0] == char) {
			basecr += crchars[i][1];
			extras.push(["角色" + char + "的突破属性", crchars[i][1], 0]);
		}
	}
	for (var i = 0; i < cdchars.length; i++) {
		if (cdchars[i][0] == char) {
			basecd += cdchars[i][1];
			extras.push(["角色" + char + "的突破属性", 0, cdchars[i][1]]);
		}
	}
	return extras;
}

function getWeaponCrit(weapon, weapon_raw, refine, stack){
	var cr = 0, cd = 0, tips = [];
	if (crit_weapons[weapon] !== undefined) {
		var wstat = crit_weapons[weapon];
		if (wstat.basecr !== undefined) {
			var effect = wstat.basecr;
			cr += effect;
			if(effect != 0) tips.push("武器 " + weapon_raw + " 的副词条提供了 " + getNumStr(effect * 100) + "% 暴击率");
		}
		if (wstat.basecd !== undefined) {
			var effect = wstat.basecd;
			cd += effect;
			if(effect != 0) tips.push("武器 " + weapon_raw + " 的副词条提供了 " + getNumStr(effect * 100) + "% 暴击伤害");
		}
		if (wstat.fixedcr !== undefined) {
			var effect = wstat.fixedcr[refine - 1];
			cr += effect;
			if(effect != 0) tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(effect * 100) + "% 暴击率");
		}
		if (wstat.fixedcd !== undefined) {
			var effect = wstat.fixedcd[refine - 1];
			cd += effect;
			if(effect != 0) tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(effect * 100) + "% 暴击伤害");
		}
		if (wstat.effectcr !== undefined && stack != 0) {
			var effect = wstat.effectcr[refine - 1];
			cr += effect;
			if(effect != 0){
				tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(effect * 100) + "% 暴击率（如需无视此特效，请将武器特效层数设置为 0）");
			}
		}
		if (wstat.effectcd !== undefined && stack != 0) {
			var effect = wstat.effectcd[refine - 1];
			cd += effect;
			if(effect != 0){
				tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(effect * 100) + "% 暴击伤害（如需无视此特效，请将武器特效层数设置为 0）");
			}
		}
		if (wstat.effectfunc !== undefined) {
			var result = wstat.effectfunc(refine, stack);
			cr += result[0];
			cd += result[1];
			if(result[0] != 0){
				tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(result[0] * 100) + "% 暴击率（如需无视此特效，请将武器特效层数设置为 0）");
			}
			if(result[1] != 0){
				tips.push("武器 " + weapon_raw + " 的特效提供了 " + getNumStr(result[1] * 100) + "% 暴击伤害（如需无视此特效，请将武器特效层数设置为 0）");
			}
		}
		if (wstat.tip !== undefined) {
			tips.push(wstat.tip);
		}
	}
	return [cr, cd, tips];
}

function getArtifactCrit(artifact, artifact_raw, count, stack){
	var cr = 0, cd = 0, tips = [];
	var count_str = (count == 2 ? "二件套" : "四件套");
	var artifact_qstr = artifact + count;
	if (crit_artifacts[artifact_qstr] !== undefined) {
		var astat = crit_artifacts[artifact_qstr];
		if (astat.fixedcr !== undefined) {
			var effect = astat.fixedcr[refine - 1];
			cr += effect;
			if(effect != 0) tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(effect * 100) + "% 暴击率");
		}
		if (astat.fixedcd !== undefined) {
			var effect = astat.fixedcd[refine - 1];
			cd += effect;
			if(effect != 0) tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(effect * 100) + "% 暴击伤害");
		}
		if (astat.effectcr !== undefined && stack != 0) {
			var effect = astat.effectcr;
			cr += effect;
			if(effect != 0){
				tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(effect * 100) + "% 暴击率（如需无视此特效，请将圣遗物特效层数设置为 0）");
			}
		}
		if (astat.effectcd !== undefined && stack != 0) {
			var effect = astat.effectcd;
			cd += effect;
			if(effect != 0){
				tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(effect * 100) + "% 暴击伤害（如需无视此特效，请将圣遗物特效层数设置为 0）");
			}
		}
		if (astat.effectfunc !== undefined) {
			var result = astat.effectfunc(stack);
			cr += result[0];
			cd += result[1];
			if(result[0] != 0){
				tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(result[0] * 100) + "% 暴击率（如需无视此特效，请将圣遗物特效层数设置为 0）");
			}
			if(result[1] != 0){
				tips.push("圣遗物 " + artifact_raw + " 的" + count_str + "特效提供了 " + getNumStr(result[1] * 100) + "% 暴击伤害（如需无视此特效，请将圣遗物特效层数设置为 0）");
			}
		}
		if (astat.tip !== undefined) {
			tips.push(astat.tip);
		}
	}
	return [cr, cd, tips];
}

function refreshStats() {
	options = {}
	var char = document.getElementById("char_name").value.trim().toLowerCase();
	var weapon = document.getElementById("weapon_name").value.trim().toLowerCase();
	var set_1 = document.getElementById("set_name_1").value.trim().toLowerCase();
	var set_2 = document.getElementById("set_name_2").value.trim().toLowerCase();
	var char_raw = char;
	var weapon_raw = weapon;
	var set_1_raw = set_1;
	var set_2_raw = set_2;
	if (char_aliases[char] !== undefined) char = char_aliases[char];
	if (weapon_aliases[weapon] !== undefined) weapon = weapon_aliases[weapon];
	if (artifact_aliases[set_1] !== undefined) set_1 = artifact_aliases[set_1];
	if (artifact_aliases[set_2] !== undefined) set_2 = artifact_aliases[set_2];
	if(set_1 == "") { set_1 = set_2; set_2 = ""; }
	if(set_1 == set_2) { set_2 = ""; }
	var cons = parseInt(document.getElementById("char_cons").value);
	if (isNaN(cons) || cons < 0 || cons > 6) cons = 0;
	var refine = parseInt(document.getElementById("weapon_refine").value);
	if (isNaN(refine) || refine < 1 || refine > 5) refine = 1;
	var stack = parseInt(document.getElementById("weapon_stack").value);
	if (isNaN(stack) || stack < 0) stack = 0;
	var astack = parseInt(document.getElementById("set_stack").value);
	if (isNaN(astack) || astack < 0) astack = 0;

	var elements = ["anemo", "geo", "electro", "dendro", "hydro", "pyro", "cryo"];
	var element = getElement(char);
	if (element === undefined) {
		element = "anemo";
		for (var i = 0; i < elements.length; i++) {
			document.getElementById("element_" + elements[i]).disabled = false;
			if (document.getElementById("element_" + elements[i]).checked) element = elements[i];
		}
	} else {
		for (var i = 0; i < elements.length; i++) {
			if (element == elements[i]){
				document.getElementById("element_" + elements[i]).disabled = false;
				document.getElementById("element_" + elements[i]).checked = true;
			} else {
				document.getElementById("element_" + elements[i]).disabled = true;
				document.getElementById("element_" + elements[i]).checked = false;
			}
		}
	}
	var statl = ["atk%", "def%", "hp%", "er", "em", "cr", "cd"];
	var l = ["atk", "def", "hp", "er", "em"];

	if (document.getElementById("isfav").checked) {
		document.getElementById("isheal").checked = false;
		document.getElementById("isheal").disabled = true;
	} else {
		document.getElementById("isheal").disabled = false;
	}
	if (document.getElementById("isheal").checked) {
		document.getElementById("isfav").checked = false;
		document.getElementById("isfav").disabled = true;
	} else {
		document.getElementById("isfav").disabled = false;
	}
	if (document.getElementById("isattack").checked) {
		document.getElementById("isphys").disabled = false;
	} else {
		document.getElementById("isphys").checked = false;
		document.getElementById("isphys").disabled = true;
	}
	if (document.getElementById("iscrcd").checked) {
		document.getElementById("main_cr").checked = false;
		document.getElementById("main_cr").disabled = true;
		document.getElementById("side_cr").checked = false;
		document.getElementById("side_cr").disabled = true;
		document.getElementById("main_cd").checked = false;
		document.getElementById("main_cd").disabled = true;
		document.getElementById("side_cd").checked = false;
		document.getElementById("side_cd").disabled = true;
		document.getElementById("crit_opt").hidden = false;
	} else {
		document.getElementById("main_cr").disabled = false;
		document.getElementById("main_cd").disabled = false;
		document.getElementById("crit_opt").hidden = true;
		l.push("cr");
		l.push("cd");
	}
	main = "atk%";
	side = []
	for (var i = 0; i < l.length; i++) {
		var stat = l[i];
		var main_id = "main_" + stat;
		var side_id = "side_" + stat;
		if (document.getElementById(main_id).checked) {
			document.getElementById(side_id).checked = false;
			document.getElementById(side_id).disabled = true;
			main = statl[i];
		} else {
			document.getElementById(side_id).disabled = false;
			if (document.getElementById(side_id).checked) side.push(statl[i]);
		}
	}
	if (char == "") {
		document.getElementById("result").value = "";
		return;
	}
	var basecr = 0.05, basecd = 0.5, tips = [];
	for (var i = 0; i < crchars.length; i++) {
		if (crchars[i][0] == char){
			basecr += crchars[i][1];
			tips.push("角色 " + char_raw + " 的突破属性提供了 " + getNumStr(crchars[i][1] * 100) + "% 暴击率");
		}
	}
	for (var i = 0; i < cdchars.length; i++) {
		if (cdchars[i][0] == char){
			basecd += cdchars[i][1];
			tips.push("角色 " + char_raw + " 的突破属性提供了 " + getNumStr(cdchars[i][1] * 100) + "% 暴击伤害");
		}
	}

	var wcrit = getWeaponCrit(weapon, weapon_raw, refine, stack);
	basecr += wcrit[0];
	basecd += wcrit[1];
	tips = tips.concat(wcrit[2]);

	var acrit_1, acrit_2;
	if(set_2 == ""){
		acrit_1 = getArtifactCrit(set_1, set_1_raw, 2, 0);
		acrit_2 = getArtifactCrit(set_1, set_1_raw, 4, astack);
	} else {
		acrit_1 = getArtifactCrit(set_1, set_1_raw, 2, 0);
		acrit_2 = getArtifactCrit(set_2, set_2_raw, 2, 0);
	}
	
	basecr += acrit_1[0];
	basecd += acrit_1[1];
	tips = tips.concat(acrit_1[2]);
	
	basecr += acrit_2[0];
	basecd += acrit_2[1];
	tips = tips.concat(acrit_2[2]);

	if(document.getElementById("double_cryo").checked){
		basecr += 0.15;
		tips.push("双冰共鸣提供了 15% 暴击率");
	}

	var extracr = parseFloat(document.getElementById("extracr").value) / 100;
	var extracd = parseFloat(document.getElementById("extracd").value) / 100;
	if(isNaN(extracr)) extracr = 0;
	if(isNaN(extracd)) extracd = 0;
	if(extracr != 0){
		basecr += extracr;
		tips.push("手动添加 " + getNumStr(extracr * 100) + "% 暴击率");
	}
	if(extracd != 0){
		basecd += extracd;
		tips.push("手动添加 " + getNumStr(extracd * 100) + "% 暴击伤害");
	}

	while(document.getElementById("crit_srcs").children.length > 0) {
		document.getElementById("crit_srcs").removeChild(document.getElementById("crit_srcs").children[0]);
	}
	
	for(var i = 0; i < tips.length; i++){
		var div = document.createElement("div");
		var text = document.createTextNode(tips[i]);
		div.appendChild(text);
		document.getElementById("crit_srcs").appendChild(div);
	}
	var options = {}
	options.isAttack = document.getElementById("isattack").checked;
	options.iscrcd = document.getElementById("iscrcd").checked;
	options.isERSand = document.getElementById("isersand").checked;
	options.isPhys = document.getElementById("isphys").checked;
	options.isHeal = document.getElementById("isheal").checked;
	options.isFav = document.getElementById("isfav").checked;
	options.dualCryo = document.getElementById("double_cryo").checked;
	var std = getStd(
		char,
		element,
		cons,
		weapon,
		refine,
		[basecr, basecd],
		set_1,
		set_2,
		main,
		side,
		options
	);
	if(document.getElementById("iscrcd").checked){
		document.getElementById("crit_result").textContent = "面板暴击：" + getNumStr(std[0] * 100) + "% / " + getNumStr(std[1] * 100) + "%";
	} else {
		document.getElementById("crit_result").textContent = "";
	}
	document.getElementById("result").value = std[2];
}
