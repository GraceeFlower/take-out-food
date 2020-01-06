function bestCharge(selectedItems) {
  var itemsList = loadAllItems();
  var promotionsList = loadPromotions();
  itemsList = addItemsCount(itemsList, selectedItems);
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