const sql = require('mssql');
const user,password,server,DB;
let config = {
  //database Configurations for Microsoft SQL server
  user: user,//Your UserName
  password: password,//Your Password
  server: server,//MSSQL server name
  database: DB,// Database Name
  //connectionTimeout: 60000
  requestTimeout: 60000 
};
let connectToDataBase = async function () {
  try {
    const pool = await new sql.ConnectionPool(config);
    await pool.connect();
    return pool;
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}
let getResult = async function (agent, transaction) {
  try {
    let connection = await connectToDataBase();
    let agentName = agent;
    let transactionName = transaction;
    let result = await connection.query`select DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') As StartTimes,ElapsedTime/1000 As ElapsedTime from TransactionDetailsView
              where AgentName=${agentName}
              AND TransactionName=${transactionName}  AND ElapsedTime<>GiveupTime
              AND DATEADD(second,StartTimeUTC, '1970/01/01 00:00:00') BETWEEN GETDATE() AND DATEADD(hour,5,GETDATE())
              Order by StartTimeUTC desc`
    connection.close();
    return result.recordset;
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}
module.exports = getResult
