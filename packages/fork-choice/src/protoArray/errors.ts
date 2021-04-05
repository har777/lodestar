import {Epoch} from "@chainsafe/lodestar-types";
import {LodestarError} from "@chainsafe/lodestar-utils";
import {HexRoot} from "./interface";

export enum ProtoArrayErrorCode {
  FINALIZED_NODE_UNKNOWN = "PROTO_ARRAY_ERROR_FINALIZED_NODE_UNKNOWN",
  JUSTIFIED_NODE_UNKNOWN = "PROTO_ARRAY_ERROR_JUSTIFIED_NODE_UNKNOWN",
  INVALID_FINALIZED_ROOT_CHANGE = "PROTO_ARRAY_ERROR_INVALID_FINALIZED_ROOT_CHANGE",
  INVALID_NODE_INDEX = "PROTO_ARRAY_ERROR_INVALID_NODE_INDEX",
  INVALID_PARENT_INDEX = "PROTO_ARRAY_ERROR_INVALID_PARENT_INDEX",
  INVALID_BEST_CHILD_INDEX = "PROTO_ARRAY_ERROR_INVALID_BEST_CHILD_INDEX",
  INVALID_JUSTIFIED_INDEX = "PROTO_ARRAY_ERROR_INVALID_JUSTIFIED_INDEX",
  INVALID_BEST_DESCENDANT_INDEX = "PROTO_ARRAY_ERROR_INVALID_BEST_DESCENDANT_INDEX",
  INVALID_PARENT_DELTA = "PROTO_ARRAY_ERROR_INVALID_PARENT_DELTA",
  INVALID_NODE_DELTA = "PROTO_ARRAY_ERROR_INVALID_NODE_DELTA",
  INDEX_OVERFLOW = "PROTO_ARRAY_ERROR_INDEX_OVERFLOW",
  INVALID_DELTA_LEN = "PROTO_ARRAY_ERROR_INVALID_DELTA_LEN",
  REVERTED_FINALIZED_EPOCH = "PROTO_ARRAY_ERROR_REVERTED_FINALIZED_EPOCH",
  INVALID_BEST_NODE = "PROTO_ARRAY_ERROR_INVALID_BEST_NODE",
}

export type ProtoArrayErrorType =
  | {code: ProtoArrayErrorCode.FINALIZED_NODE_UNKNOWN; root: HexRoot}
  | {code: ProtoArrayErrorCode.JUSTIFIED_NODE_UNKNOWN; root: HexRoot}
  | {code: ProtoArrayErrorCode.INVALID_FINALIZED_ROOT_CHANGE}
  | {code: ProtoArrayErrorCode.INVALID_NODE_INDEX; index: number}
  | {code: ProtoArrayErrorCode.INVALID_PARENT_INDEX; index: number}
  | {code: ProtoArrayErrorCode.INVALID_BEST_CHILD_INDEX; index: number}
  | {code: ProtoArrayErrorCode.INVALID_JUSTIFIED_INDEX; index: number}
  | {code: ProtoArrayErrorCode.INVALID_BEST_DESCENDANT_INDEX; index: number}
  | {code: ProtoArrayErrorCode.INVALID_PARENT_DELTA; index: number}
  | {code: ProtoArrayErrorCode.INVALID_NODE_DELTA; index: number}
  | {code: ProtoArrayErrorCode.INDEX_OVERFLOW; value: string}
  | {code: ProtoArrayErrorCode.INVALID_DELTA_LEN; deltas: number; indices: number}
  | {code: ProtoArrayErrorCode.REVERTED_FINALIZED_EPOCH; currentFinalizedEpoch: Epoch; newFinalizedEpoch: Epoch}
  | {
      code: ProtoArrayErrorCode.INVALID_BEST_NODE;
      startRoot: HexRoot;
      justifiedEpoch: Epoch;
      finalizedEpoch: Epoch;
      headRoot: HexRoot;
      headJustifiedEpoch: Epoch;
      headFinalizedEpoch: Epoch;
    };

export class ProtoArrayError extends LodestarError<ProtoArrayErrorType> {
  constructor(type: ProtoArrayErrorType) {
    super(type);
  }
}