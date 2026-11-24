import { useRouter } from "vue-router";

export abstract class RouteHandler {
    protected router = useRouter()
}