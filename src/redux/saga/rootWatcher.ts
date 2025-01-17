import { all } from "redux-saga/effects";
import { authWather } from "./authSaga";
import { postWather } from "./postSaga";
import { authorsWather } from "./authorsSaga";
import { tagsWather } from "./tagsSaga";

export function* rootWatcher() {
  yield all([authWather(), postWather(), authorsWather(), tagsWather()])
}