import {ArrowRight, Mail} from "lucide-react";

const RequestResetForm = ({ onNext, email, setEmail, isBtnDisabled }: any) => {
    return (
        <form className="space-y-4" onSubmit={onNext} autoComplete="off">
            <div className="space-y-2">
                <label className="leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary">Email</label>
                <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                        <Mail strokeWidth={2} size={16} />
                    </div>
                    <input
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                    />
                </div>
            </div>
            <button
                disabled={isBtnDisabled}
                type="submit"
                className=" w-full text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-md py-2 text-sm flex items-center justify-center gap-2"
            >
                <p className="text-sm">Send Reset Code</p>
                <ArrowRight className="w-4 h-4" />
            </button>
        </form>
    );
};

export default RequestResetForm;