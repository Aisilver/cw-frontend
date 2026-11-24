import { RouteHandler } from "@/app/abs-classes/route-handler.class";

export class MainFeaturesRouter extends RouteHandler{
    toHome() {
        this.router.push("/")
    }

    toAuth(where: "login" | "signup" = "login") {
        if(where == "login")
            this.router.push(`/auth`)
        else
            this.router.push(`/auth/${where}`)
    }
}