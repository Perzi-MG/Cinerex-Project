import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function TicketModal({seat, movie, date}: {seat: string, movie: string, date: string}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Ver ticket</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex flex-col gap-5 items-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ticket</ModalHeader>
              <ModalBody>
                <h1>{seat}</h1>
                <h1>{movie}</h1>
                <h1>{date}</h1>
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
