import { APP_IMAGE_PATHs_CONFIGURATIONS } from "@/app/configurations/image-paths.config";
import gsap from "gsap";

export class PingComponent {
    readonly TotalRetries = 3

    readonly TryDuration = 2;

    private tries = 1

    private readonly html = `
        <div class="icon-holder">
            <div class="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
            </div>
        </div>

        <h3 class="title">Getting things ready...</h3>

        <div class="line"></div>

        <p class="text">Please wait while we make sure everything is okay.</p>
    `

    private declare componentBody: HTMLElement

    private declare iconHolderElement: HTMLElement

    private declare titleElement: HTMLElement

    private declare lineElement: HTMLElement

    private declare TextElement: HTMLElement

    private compClassName = "ping-component"

    private lineAnimationTimeLine = gsap.timeline({paused: true, repeat: this.TotalRetries - 1})

    constructor() {
        this.componentBody = document.createElement("section")

        this.componentBody.classList.add(this.compClassName)

        this.componentBody.innerHTML = this.html

        window.document.body.append(this.componentBody)

        //@ts-ignore
        this.iconHolderElement = this.componentBody.querySelector(".icon-holder")

        //@ts-ignore
        this.titleElement = this.componentBody.querySelector(".title")

        //@ts-ignore
        this.lineElement = this.componentBody.querySelector(".line")

        //@ts-ignore
        this.TextElement = this.componentBody.querySelector(".text")

        this.lineAnimationTimeLine.to(this.lineElement, {width: "70%", duration: this.TryDuration})

        this.lineAnimationTimeLine.play()
    }

    Retrying () {
        this.tries++

        if(this.tries < this.TotalRetries) {
            this.titleElement.innerText = "Still trying to connect…"

            this.TextElement.innerText = "The server isn't responding just yet. We're giving it another try. Thanks for your patience!"
        }

        else if(this.tries == this.TotalRetries){
            this.titleElement.innerText = "Trying for the last time..."
        }
    }

    PingSuccessfull() {
        this.componentBody.remove()
    }

    Failed () {
        const {CONNECTION_LOST} = APP_IMAGE_PATHs_CONFIGURATIONS

        this.lineAnimationTimeLine.revert()

        this.lineElement.remove()

        this.iconHolderElement.innerHTML = `
            <img src="${CONNECTION_LOST}">
        `

        this.titleElement.innerText = "Failed to connect with server..."

        this.TextElement.innerText = "We couldn't reach the server. Try again later."
    }
}