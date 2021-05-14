import {allForks, phase0} from "@chainsafe/lodestar-types";
import {CachedBeaconState} from "../../allForks/util";
import {processBlockHeader, processEth1Data, processRandao} from "../../allForks/block";
import {IBeaconStateTransitionMetrics} from "../../metrics";
import {processOperations} from "./processOperations";
import {processAttestation} from "./processAttestation";
import {processAttesterSlashing} from "./processAttesterSlashing";
import {processDeposit} from "./processDeposit";
import {processProposerSlashing} from "./processProposerSlashing";
import {processVoluntaryExit} from "./processVoluntaryExit";

// Extra utils used by other modules
export {isValidIndexedAttestation} from "../../allForks/block";

export {
  processOperations,
  processAttestation,
  processAttesterSlashing,
  processDeposit,
  processProposerSlashing,
  processVoluntaryExit,
};

export function processBlock(
  state: CachedBeaconState<phase0.BeaconState>,
  block: phase0.BeaconBlock,
  verifySignatures = true,
  metrics?: IBeaconStateTransitionMetrics | null
): void {
  const timer = metrics?.stfnProcessBlock.startTimer();
  processBlockHeader(state as CachedBeaconState<allForks.BeaconState>, block);
  processRandao(state as CachedBeaconState<allForks.BeaconState>, block, verifySignatures);
  processEth1Data(state as CachedBeaconState<allForks.BeaconState>, block.body);
  processOperations(state, block.body, verifySignatures);
  if (timer) timer();
}