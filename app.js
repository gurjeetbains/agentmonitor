const database = require('./database');
const mail = require('./mailing');
checkScript();
async function checkScript() {
  try {
    const xlsa = require('./xlsa');
    for (var i = 0; i < xlsa.transactiondetails.length; i++) {
      let failedAgents = [];
      if (xlsa.transactiondetails[i].Check == 'Yes') {
        for (var j = 0; j < xlsa.agentdetails.length; j++) {
          if ((Object.keys(xlsa.agentdetails[j])).includes(xlsa.transactiondetails[i].ScriptName)) {
            let result = await database(xlsa.agentdetails[j].Agent, xlsa.transactiondetails[i].LTCTransactionName);
            if (result.length <= 0) {
              failedAgents.push(xlsa.agentdetails[j].Location)
            }
          }
        }
      }
      //mail data
      if (failedAgents.length > 0) {
        await mail(failedAgents, xlsa.transactiondetails[i].Module)
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}
