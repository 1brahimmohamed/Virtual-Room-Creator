import {Fragment, useRef, useState} from 'react'
// @ts-ignore
import {Dialog, Transition} from '@headlessui/react'
import {ArrowRightCircleIcon} from '@heroicons/react/20/solid'

const EnterRoomPopup = () => {
    const [open, setOpen] = useState(true)
    const formRef = useRef(null);

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(formRef.current['roomUrl'].value);

        // TODO: Add logic to redirect to room
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden space-y-6 rounded-2xl bg-secondary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <Dialog.Title as="h3" className="text-2xl font-bold text-white text-left leading-6">
                                        Enter Room Link
                                    </Dialog.Title>
                                </div>

                                <div>
                                    <form className="space-y-6 text-white" ref={formRef}>
                                        <div className="mt-2 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="roomUrl"
                                                    id="roomUrl"
                                                    className="block w-full focus:outline-none bg-[#3b2063] rounded-l-md border-0 py-1.5 p-2 text-white placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                    placeholder="Room URL"
                                                />
                                            <button
                                                type="button"
                                                onClick={onSubmit}
                                                className="relative bg-[#3b2063] -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gradient2"
                                            >
                                                <ArrowRightCircleIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EnterRoomPopup;
