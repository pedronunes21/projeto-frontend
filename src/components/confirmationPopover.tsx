import * as Popover from '@radix-ui/react-popover';
import { FaTrash } from "react-icons/fa"

export function ConfirmationPopover(props: {
    action: () => Promise<void>;
    message: string;
}) {


    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button><FaTrash color="red" size={15} /></button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none text-center">{props.message}</h4>
                            <div className="flex items-center justify-center gap-[20px] pt-[20px]">

                                <Popover.Close className="PopoverClose" aria-label="Close">
                                    <button className="px-[20px] py-[5px] bg-grey rounded-[5px]">Não</button>
                                </Popover.Close>
                                <button onClick={() => props.action()} className="px-[20px] py-[5px] bg-red-600 rounded-[5px] text-white">Excluir</button>
                            </div>
                        </div>
                    </div>

                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
