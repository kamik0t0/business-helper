import { useContext, ChangeEvent, FC } from "react";
import { ModalContext } from "../../../../../../blocks/content/Main";
import Button from "../../../../../../UI/input/Button/Button";
import { modalManager } from "../../../../../../UI/modal/service/handlers/modal-control";
import classes from "./styles/delete-buttons.module.css";

const Buttons: FC<{
    deleteOrg: (event: ChangeEvent<HTMLButtonElement>) => Promise<void>;
}> = ({ deleteOrg }) => {
    const { setModalDelete } = useContext(ModalContext)!;
    const [, hideModal] = modalManager(setModalDelete);

    return (
        <>
            <div className={classes.controls}>
                <Button onClick={deleteOrg}>Yes</Button>
                <Button onClick={hideModal}>No</Button>
            </div>
        </>
    );
};

export default Buttons;
