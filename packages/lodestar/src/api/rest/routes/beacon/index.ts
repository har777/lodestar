import {registerForkEndpoint} from "./fork";
import {LodestarApiPlugin} from "../../interface";
import {registerBlockStreamEndpoint} from "./blockStream";
import {registerGetValidatorEndpoint} from "./validator";
import {FastifyInstance} from "fastify";
import {
  getBlock,
  getBlockAttestations,
  getBlockHeader,
  getBlockHeaders,
  getBlockRoot,
  getGenesis,
  getPoolAttestations,
  getStateFinalityCheckpoints,
} from "../../controllers/beacon";

//old
export const beacon: LodestarApiPlugin = (fastify, opts, done: Function): void => {
  registerForkEndpoint(fastify, opts);
  registerGetValidatorEndpoint(fastify, opts);
  registerBlockStreamEndpoint(fastify, opts);
  done();
};

//new
export function registerBeaconRoutes(server: FastifyInstance): void {
  server.register(
    async function (fastify) {
      fastify.get(getGenesis.url, getGenesis.opts, getGenesis.handler);

      //state
      fastify.get(
        getStateFinalityCheckpoints.url,
        getStateFinalityCheckpoints.opts,
        getStateFinalityCheckpoints.handler
      );

      //pool
      fastify.get(getPoolAttestations.url, getPoolAttestations.opts, getPoolAttestations.handler);

      //blocks
      fastify.get(getBlockHeaders.url, getBlockHeaders.opts, getBlockHeaders.handler);
      fastify.get(getBlockHeader.url, getBlockHeader.opts, getBlockHeader.handler);
      fastify.get(getBlock.url, getBlock.opts, getBlock.handler);
      fastify.get(getBlockRoot.url, getBlockRoot.opts, getBlockRoot.handler);
      fastify.get(getBlockAttestations.url, getBlockAttestations.opts, getBlockAttestations.handler);
    },
    {prefix: "/v1/beacon"}
  );
}
