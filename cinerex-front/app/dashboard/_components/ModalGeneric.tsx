import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { LucidePlus } from "lucide-react";
export default function ModalGeneric({header, children}: {header: string, children: React.ReactNode}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className="mx-10 bg-[#02111B] text-[#00CFC1]" onPress={onOpen}><LucidePlus /></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
