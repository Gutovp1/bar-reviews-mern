import BarsDAO from "../dao/barsDAO.js";

export default class BarsController {
  static async apiGetBars(req, res, next) {
    const barsPerPage = req.query.barsPerPage
      ? parseInt(req.query.barsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { barsList, totalNumBars } = await BarsDAO.getBars({
      filters,
      page,
      barsPerPage,
    });

    let response = {
      bars: barsList,
      page: page,
      filters: filters,
      entries_per_page: barsPerPage,
      total_results: totalNumBars,
    };
    res.json(response);
  }
}
