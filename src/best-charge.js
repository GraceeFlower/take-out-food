function bestCharge(selectedItems) {
  var itemsList = loadAllItems();
  var promotionsList = loadPromotions();
  itemsList = addItemsCount(itemsList, selectedItems);
  var total = calculateTotal(itemsList);
  return /*TODO*/;
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

function calculateHalfPriceSaving(itemsList, promotion) {
  var containedHalf = [];
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