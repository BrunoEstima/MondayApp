const mondayService = require('../services/monday-service');
const transformationService = require('../services/transformation-service');
const { TRANSFORMATION_TYPES } = require('../constants/transformation');
const { consoleLog, consoleFunctionLog} = require('../helpers/consoleLogger');

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  consoleFunctionLog('# Starting executeAction');
  consoleLog('- Token:');
  consoleLog(shortLivedToken);
  consoleLog('- Payload:');
  consoleLog(payload);

  try {

    const { inputFields } = payload;
    const { itemId, columnId, boardId } = inputFields;

    consoleFunctionLog('# Starting executeAction');
    consoleLog('- Token:');
    consoleLog(shortLivedToken);
    consoleLog('- Payload:');
    consoleLog(payload);
    consoleLog('- Item ID:');
    consoleLog(itemId);
    consoleLog('- Column ID:');
    consoleLog(columnId);

    const itemData = await mondayService.getItemDataById(shortLivedToken, itemId);

    consoleLog('- Item Payload:');
    consoleLog(itemData);

    const [ item ] = itemData.data.items || [];

    consoleLog('- Item:');
    consoleLog(item);

    const columnValue = item.name;
    
    const duplicateItemData = await mondayService.getItemDataByColumnValue(shortLivedToken, boardId, 'name', columnValue);
    
    const items_dup = duplicateItemData.data.items_by_column_values || [];
    consoleLog('- Item With Same Name:');
    consoleLog(items_dup);

    if(
      items_dup.length > 0
    ) {
      console.log('Item is duplicated!')
      const changeColumnResponse = await mondayService.setStatusColumnValue(shortLivedToken, boardId, itemId, columnId, "Duplicate");
      consoleLog(changeColumnResponse);
    } else {
      console.log('Item is NOT duplicated!')
    }

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction
};
