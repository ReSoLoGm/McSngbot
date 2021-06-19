module.exports = async (bot) => {
    //自動丟垃圾
    let itemsStayed = [   //不要被丟棄的物品
        "diamond_sword",
        "netherite_sword",
        "totem_of_undying",
        "cooked_cod",
        "bread",
        "carrot",
    ];

    let inventory = bot.inventory;

    await (async function toss(items) {
        let {value: item, done} = items.next();
        if (done) {
            await new Promise((res, rej) => setTimeout(res, 2000));
            await toss(inventory.items().values());
        } else if (itemsStayed.includes(item.name)) {
            await toss(items)
        } else {
            await bot.toss(item.type, item.metadata, item.count, err => toss(items));
        }
    })(inventory.items().values());
}
