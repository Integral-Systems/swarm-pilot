import { Layer, ManagedRuntime } from "effect";
import { ConfigLayer } from "./config";
export const build_runtime = (args) => ManagedRuntime.make(Layer.mergeAll(ConfigLayer(args)));
