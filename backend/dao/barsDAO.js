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

    let cursor;
    try {
      cursor = await bars.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { barsList: [], totalNumBars: 0 };
    }

    const displayCursor = cursor.limit(barsPerPage).skip(barsPerPage * page);

    try {
      const barsList = await displayCursor.toArray();
      const totalNumBars = await bars.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { barsList: [], totalNumBars: 0 };
    }
  }
}
//https://youtu.be/mrHNSanmqQ4?t=1643
