import { Context, Ref } from "effect"
import { DockerServiceInspect } from "./schemas/service"
import { DockerNodeInspect } from "./schemas/node"


export class ServiceInspectState extends Context.Tag("ServiceInspectState")<
ServiceInspectState,
  Ref.Ref<DockerServiceInspect>
>() {}
export const service_inspect_init = Ref.make([] as DockerServiceInspect)

export class NodeInspectState extends Context.Tag("NodeInspectState")<
NodeInspectState,
  Ref.Ref<DockerNodeInspect>
>() {}
export const node_inspect_init = Ref.make([] as DockerNodeInspect)

