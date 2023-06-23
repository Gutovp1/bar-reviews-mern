let bars;

export default class BarsDAO {
  static async injectDB(conn) {
    if (bars) {
      return;
    }
    try {
      bars = await conn
        .db(process.env.BARSREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(`Unable to establish a connection handle in barsDAO: ${e}`);
    }
  }

  static async getBars({ filters = null, page = 0, barsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
  }
}

//https://youtu.be/mrHNSanmqQ4?t=1643
