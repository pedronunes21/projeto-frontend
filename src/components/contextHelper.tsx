
import { useContext } from 'react'
import { FaQuestionCircle } from "react-icons/fa";
import * as Popover from '@radix-ui/react-popover';

import { AdminContext } from "@/context/admin";

export default function ContextHelper(props: {
    text?: string;
    adminText?: String;
}) {

    const isAdmin = useContext(AdminContext)

    if (!props.text && !props.adminText) return;

    return (
        <div className="absolute top-[73px] right-[15px]">
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button><FaQuestionCircle size={30} color="gray" /></button>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className="PopoverContent border border-gray-300 rounded-[8px] shadow-lg right-0 absolute !w-[400px]" sideOffset={5}>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none text-left">{isAdmin ? props.adminText : props.text}</h4>

                            </div>
                        </div>

                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>

    )
}

