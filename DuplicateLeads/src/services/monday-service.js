const initMondayClient = require('monday-sdk-js');
const { consoleLog, consoleFunctionLog} = require('../helpers/consoleLogger');

const getColumnValue = async (token, itemId, columnId) => {
  consoleFunctionLog('getColumnValue');
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [Int], $columnId: [String]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            value
          }
        }
      }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    return response.data.items[0].column_values[0].value;
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  consoleFunctionLog('changeColumnValue');
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const getItemDataById = async (token, itemId) => {
  consoleFunctionLog('getItemData');
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query($itemId: [Int]) {
      items (ids: $itemId) 
      {
          id
          name
          column_values {
              id
              additional_info            
              text
              title
              type
              value
          }
      }
    }`;
    
    const variables = { itemId };

    const response = await mondayClient.api(query, { variables });

    return response;
  } catch (err) {
    console.error(err);
  }
}

const getItemDataByColumnValue = async (token, boardId, columnId, columnValue) => {
  consoleFunctionLog('getItemByColumnValue');
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query ($boardId: Int!, $columnId: String!, $columnValue: String!){
      items_by_column_values (board_id: $boardId, column_id: $columnId, column_value: $columnValue) {
          id
          name
          column_values {
            id
            additional_info            
            text
            title
            type
            value
        }
      }
  }`;
    
    const variables = { boardId, columnId, columnValue };

    const response = await mondayClient.api(query, { variables });

    consoleLog(response);

    return response;
  } catch (err) {
    console.error(err);
  }
}

const setStatusColumnValue = async (token, boardId, itemId, columnId, value) => {
  const parsedValue = `{\"label\": \"${value}\"}`;
  return changeColumnValue(token, boardId, itemId, columnId, parsedValue);
}

module.exports = {
  getColumnValue,
  changeColumnValue,
  getItemDataById,
  getItemDataByColumnValue,
  setStatusColumnValue
};
