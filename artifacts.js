// TODO: crit_artifacts will be moved to all_artifacts.
crit_artifacts = {
	"resolutionofsojourner4": { effectcr: 0.3 },
	"blizzardstrayer4": {
		effectfunc: function (stack) {
			if (stack <= 0) return [0, 0];
			if (stack >= 2) return [0.2, 0];
			return [0.4, 0];
		},
		tip: "冰套4件套，层数为0表示不触发，层数为1表示冻结，层数为2表示仅处于冰元素影响下"
	},
	"resolutionofsojourner4": { effectcr: 0.3 },
	"berserker2": { fixedcr: 0.12 },
	"berserker4": { effectcr: 0.24 },
}