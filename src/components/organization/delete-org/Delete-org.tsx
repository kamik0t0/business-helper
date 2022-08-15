import classes from "./styles/delete-org.module.css";
import Button from "../../../UI/input/Button/Button";
import Loader from "../../../UI/Loader/Loader";
import Buttons from "./service/components/delete-buttons/Delete-buttons";
import { useDeleteOrg } from "./service/hooks/useDeleteOrg";

type DeleteOrgTypes = {
    id: number | null | undefined;
    orgname: string | null | undefined;
    action: any;
    isLoading: boolean;
};

const DeleteOrg: React.FC<DeleteOrgTypes> = ({
    id,
    orgname,
    action,
    isLoading,
}) => {
    const [deleteOrg, hideModal] = useDeleteOrg(id, action);

    return (
        <>
            {id === null ? (
                <div className={classes.noorg}>
                    <div className={classes.noorg__text}>
                        Организация не выбрана
                    </div>
                    <Button onClick={hideModal}>Закрыть</Button>
                </div>
            ) : (
                <div className={classes.delete}>
                    <div
                        className={classes.text}
                    >{`Вы действительно хотите удалить ${orgname}?`}</div>
                    {isLoading ? <Loader /> : <Buttons deleteOrg={deleteOrg} />}
                </div>
            )}
        </>
    );
};

export default DeleteOrg;
