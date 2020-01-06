function bestCharge(selectedItems) {
  var itemsList = loadAllItems();
  var promotionsList = loadPromotions();
  itemsList = addItemsCount(itemsList, selectedItems);
  var total = calculateTotal(itemsList);
  var {highestSaving, halfPriceList, savingName} = 
    chooseDiscount(itemsList, promotionsList, total);
  var bestChargeDetail = [savingName, halfPriceList, highestSaving];
  total -= highestSaving;
  
  return printTicket(itemsList, bestChargeDetail, total);
}

function addItemsCount(itemsList, selectedItems) {
  const regexCount = /(?<=x\s+)\d+/;
  const regexId = /.*?(?=\s+x)/;
  let addedCountList = [];
  selectedItems.forEach((item) => {
    let itemCount = parseInt(item.match(regexCount));
    let itemId = item.match(regexId)[0];
    itemsList.forEach((value) => {
      if(value.id === itemId) {
        value["count"] = itemCount;
        return addedCountList.push(value);
      }
    });
  });
  return addedCountList;
}

function calculateTotal(itemsList) {
  return itemsList.reduce((total, item) => 
    total += item.count * item.price, 0);
}

function chooseDiscount(itemsList, promotionsList, total) {
  if (total < 30) {
    var {halfPrice, halfPriceList} = 
      calculateHalfPriceSaving(itemsList, promotionsList);
    var highestSaving = halfPrice;
    var savingName = halfPrice ? promotionsList[1].type : "";
  } else {
    var {highestSaving, halfPriceList, savingName} = 
      judgeTheHighestSaving(itemsList, promotionsList, total);
  }
  return {
    highestSaving: highestSaving,
    halfPriceList: halfPriceList,
    savingName: savingName
  }
}

function judgeTheHighestSaving(itemsList, promotionsList, total) {
  let {halfPrice, halfPriceList} = 
    calculateHalfPriceSaving(itemsList, promotionsList, total);
  let fullReduce = 6;
  let saving = Math.max(halfPrice, fullReduce);
  let savingName;
  if (fullReduce < halfPrice) {
    savingName = promotionsList[1].type;
  } else {
    savingName = promotionsList[0].type;
  }
  return {
    highestSaving: saving,
    halfPriceList: halfPriceList,
    savingName: savingName
  }
}

function calculateHalfPriceSaving(itemsList, promotion) {
  let containedHalf = [];
  let saving = 0;
  promotion[1].items.forEach((value) => {
    itemsList.forEach((item) => {
      if(item.id === value)  {
        saving += item.price / 2;
        containedHalf.push(item.name);
      }
    });
  });
  return {
    halfPrice: saving,
    halfPriceList: containedHalf  
  };
}

function printTicket(itemsList, discount, total) {
  var menu = itemsList.reduce((menu, item) => 
  menu += `${item.name} x ${item.count} = ${item.price * item.count}元\n`, "").trim();
  var discountInfo = '';
  if (discount[0] === '指定菜品半价') {
    discountInfo = 
    (`使用优惠:\n${discount[0]}(${discount[1].join('，')})，省${discount[2]}元\n`.trim())
    + '\n-----------------------------------\n';
  } else if(discount[0] === '满30减6元') {
    discountInfo = 
    (`使用优惠:\n${discount[0]}，省${discount[2]}元\n`.trim())
    + '\n-----------------------------------\n';
  }
  return `
============= 订餐明细 =============
${menu}
-----------------------------------
${discountInfo}总计：${total}元
===================================`;
}

bestCharge(selectedItems);
