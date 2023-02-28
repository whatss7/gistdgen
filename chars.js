// TODO: crchars and cdchars will be moved to all_chars.
all_chars = [
	{
		name: "lumineanemo",
		weapon: "sword",
		element: "anemo",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "aetheranemo",
		weapon: "sword",
		element: "anemo",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "luminegeo",
		weapon: "sword",
		element: "geo",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {
			1: { type: "cr", value: 0.1 }
		},
	},
	{
		name: "aethergeo",
		weapon: "sword",
		element: "geo",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {
			1: { type: "cr", value: 0.1 }
		},
	},
	{
		name: "lumineelectro",
		weapon: "sword",
		element: "electro",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "aetherelectro",
		weapon: "sword",
		element: "electro",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "luminedendro",
		weapon: "sword",
		element: "dendro",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "aetherdendro",
		weapon: "sword",
		element: "dendro",
		stats: { hp: 10875, atk: 212, def: 683, type: "atk%", amount: 0.24 },
		crit_talents: {},
		crit_cons: {},
	},
	{
		name: "amber",
		weapon: "bow",
		element: "pyro",
		stats: { hp: 9461, atk: 223, def: 601, type: "atk%", amount: 0.24 },
		crit_talents: {
			1: { type: "cr", value: 0.1 }
		},
		crit_cons: {},
	},
];

crchars = [
	["xiao", 0.192],
	["wanderer", 0.192],
	["itto", 0.192],
	["yaemiko", 0.192],
	["yelan", 0.192],
	["diluc", 0.192],
	["yoimiya", 0.192],
]
cdchars = [
	["keqing", 0.384],
	["cyno", 0.384],
	["ayato", 0.384],
	["hutao", 0.384],
	["ganyu", 0.384],
	["eula", 0.384],
	["ayaka", 0.384],
]

function getElement(char) {
	var elements = {
		// anemo
		"lumineanemo": "anemo",
		"aetheranemo": "anemo",
		"sucrose": "anemo",
		"venti": "anemo",
		"jean": "anemo",
		"xiao": "anemo",
		"kazuha": "anemo",
		"sayu": "anemo",
		"heizou": "anemo",
		"faruzan": "anemo",
		"wanderer": "anemo",
		// geo
		"luminegeo": "geo",
		"aethergeo": "geo",
		"noelle": "geo",
		"ningguang": "geo",
		"zhongli": "geo",
		"albedo": "geo",
		"itto": "geo",
		"gorou": "geo",
		"yunjin": "geo",
		// electro
		"lumineelectro": "electro",
		"aetherelectro": "electro",
		"keqing": "electro",
		"fischl": "electro",
		"beidou": "electro",
		"razor": "electro",
		"lisa": "electro",
		"sara": "electro",
		"raiden": "electro",
		"yaemiko": "electro",
		"kuki": "electro",
		"dori": "electro",
		"cyno": "electro",
		// dendro
		"luminedendro": "dendro",
		"aetherdendro": "dendro",
		"tighnari": "dendro",
		"collei": "dendro",
		"nahida": "dendro",
		"alhaitham": "dendro",
		"yaoyao": "dendro",
		// hydro
		"mona": "hydro",
		"xingqiu": "hydro",
		"barbara": "hydro",
		"tartaglia": "hydro",
		"kokomi": "hydro",
		"ayato": "hydro",
		"yelan": "hydro",
		"candace": "hydro",
		"nilou": "hydro",
		// pyro
		"bennett": "pyro",
		"klee": "pyro",
		"xiangling": "pyro",
		"amber": "pyro",
		"diluc": "pyro",
		"xinyan": "pyro",
		"hutao": "pyro",
		"yanfei": "pyro",
		"yoimiya": "pyro",
		"thoma": "pyro",
		"dehya": "pyro",
		// cryos
		"chongyun": "cryo",
		"qiqi": "cryo",
		"kaeya": "cryo",
		"diona": "cryo",
		"ganyu": "cryo",
		"rosaria": "cryo",
		"eula": "cryo",
		"ayaka": "cryo",
		"aloy": "cryo",
		"shenhe": "cryo",
		"layla": "cryo",
		"mika": "cryo",
	}
	return elements[char];
}