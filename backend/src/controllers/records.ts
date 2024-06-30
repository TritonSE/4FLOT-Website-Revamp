import { RequestHandler } from "express";
import RecordModel from "src/models/records";

export const getRecord: RequestHandler = async (req, res, next) => {
  const { card } = req.params;
  try {
    const updatedRecord = await RecordModel.findOne({ card });
    if (updatedRecord === null) {
      res.status(404);
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

export const updateRecord: RequestHandler = async (req, res, next) => {
  const { card } = req.params;

  try {
    console.log("req.body: ", req.body);
    const record = await RecordModel.findOneAndUpdate({ card: card }, req.body);

    if (record === null) {
      res.status(404);
    }
    const updatedRecord = await RecordModel.findOne({ card });
    if (updatedRecord === null) {
      res.status(404);
    }

    if (card === "home" || card === "about" || card === "involved" || card === "impact") {
      const pageRecord = await RecordModel.findOneAndUpdate(
        { card: "page-editor" },
        { date: req.body.date },
      );
      if (pageRecord === null) {
        res.status(404);
      }
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};
