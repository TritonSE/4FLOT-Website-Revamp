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
    const record = await RecordModel.findOneAndUpdate({ card: card }, req.body);

    if (record === null) {
      res.status(404);
    }
    const updatedRecord = await RecordModel.findOne({ card });
    if (updatedRecord === null) {
      res.status(404);
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};
