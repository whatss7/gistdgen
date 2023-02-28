// crit_weapons will be moved to all_weapons.
crit_weapons = {
	// swords
	"harbingerofdawn": { basecd: 0.469, effectcr: [0.14, 0.175, 0.21, 0.245, 0.28] },
	"blackclifflongsword": { basecd: 0.368, },
	"theblacksword": { basecr: 0.276 },
	"festeringdesire": { effectcr: [0.06, 0.075, 0.09, 0.105, 0.12] },
	"royallongsword": { effectcr: [0.06, 0.065, 0.07, 0.075, 0.08], tip: "宗室系列武器建议手动配平，所给出数值仅为粗略估计" },
	"skywardblade": { fixedcr: [0.04, 0.05, 0.06, 0.07, 0.08] },
	"foliarincision": { basecd: 0.882, fixedcr: [0.04, 0.05, 0.06, 0.07, 0.08] },
	"primordialjadecutter": { basecr: 0.441 },
	"harangeppakufutsu": { basecr: 0.331 },
	"mistsplitterreforged": { basecd: 0.441 },
	// claymore
	"royalgreatsword": { effectcr: [0.06, 0.065, 0.07, 0.075, 0.08], tip: "宗室系列武器建议手动配平，所给出数值仅为粗略估计" },
	"blackcliffslasher": { basecd: 0.551 },
	"serpentspine": { basecr: 0.276 },
	"lithicblade": {
		effectfunc: function (refine, stack) {
			if (stack > 4) stack = 4;
			if (stack < 0) stack = 0;
			return [[0.03, 0.04, 0.05, 0.06, 0.07][refine - 1] * stack, 0];
		},
		tip: "千岩系列武器，队伍中每有一名璃月角色，计1层武器特效。"
	},
	"redhornstonethresher": { basecd: 0.882 },
	// bow
	"messenger": { basecd: 0.312, effectcr: 1 },
	"slingshot": { basecd: 0.312 },
	"sharpshootersoath": { basecd: 0.469 },
	"royalbow": { effectcr: [0.06, 0.065, 0.07, 0.075, 0.08], tip: "宗室系列武器建议手动配平，所给出数值仅为粗略估计" },
	"blackcliffwarbow": { basecd: 0.368 },
	"theviridescenthunt": { basecr: 0.276 },
	"skywardharp": { basecr: 0.221, fixedcd: [0.2, 0.25, 0.3, 0.35, 0.4] },
	"hunterspath": { basecr: 0.441 },
	"thunderingpulse": { basecd: 0.662 },
	"aquasimulacra": { basecd: 0.882 },
	"polarstar": { basecr: 0.331 },
	// catalyst
	"twinnephrite": { basecr: 0.156 },
	"royalgrimoire": { effectcr: [0.06, 0.065, 0.07, 0.075, 0.08], tip: "宗室系列武器建议手动配平，所给出数值仅为粗略估计" },
	"blackcliffagate": { basecd: 0.551 },
	"thewidsith": { basecd: 0.551 },
	"solarpearl": { basecr: 0.276 },
	"tulaytullahsremembrance": { basecd: 0.441 },
	"kagurasverity": { basecd: 0.662 },
	"lostprayertothesacredwinds": { basecr: 0.331 },
	// polearm
	"whitetassel": { basecr: 0.234 },
	"deathmatch": { basecr: 0.368 },
	"royalspear": { effectcr: [0.06, 0.065, 0.07, 0.075, 0.08], tip: "宗室系列武器建议手动配平，所给出数值仅为粗略估计" },
	"lithicspear": {
		effectfunc: function (refine, stack) {
			if (stack > 4) stack = 4;
			if (stack < 0) stack = 0;
			return [[0.03, 0.04, 0.05, 0.06, 0.07][refine - 1] * stack, 0];
		},
		tip: "千岩系列武器，队伍中每有一名璃月角色，计1层武器特效。"
	},
	"thecatch": { effectcr: [0.06, 0.075, 0.09, 0.105, 0.12] },
	"blackcliffpole": { basecd: 0.551 },
	"staffofhoma": { basecd: 0.662 },
	"staffofthescarletsands": { basecr: 0.441 },
	"primordialjadewingedspear": { basecr: 0.221 },
	"skywardspine": { fixedcr: [0.08, 0.1, 0.12, 0.14, 0.16] }
}

weapon_70 = [
	"dullblade",
	"sliversword",
	"wastergreatsword",
	"oldmercspal",
	"beginnersprotector",
	"ironpoint",
	"apprenticesnotes",
	"pocketgrimoire",
	"huntersbow",
	"seasonedhuntersbow"
];