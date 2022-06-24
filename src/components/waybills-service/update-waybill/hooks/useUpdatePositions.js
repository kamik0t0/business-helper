import { useState, useRef } from "react";
import { PositionClass } from "../../../../utils/wbpositionClass";
import { highlight } from "../../../../utils/highlight";
import { getValue } from "../../common/scripts";
import { getData } from "../../../../utils/getData";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthAction } from "../../../../redux/auth-reducer";

export function useUpdatePositions() {
    const dispatch = useDispatch();
    const [positions, setPositions] = useState([]);
    const [counter, setCounter] = useState(0);
    const { orgId, id } = useParams();

    // useRef - запоминаем значение при ререндеринге
    let row = useRef(null);
    const { pathname } = useLocation();

    console.log(pathname);

    const type = pathname === `/sales/${orgId}/${id}` ? "SaleId" : "PurchaseId";

    const [loader, setLoader] = useState(true);

    const addPosition = (event) => {
        event.preventDefault();
        const arr = positions;
        arr.push(new PositionClass(counter));
        setCounter((prev) => prev + 1);
        setPositions([...arr]);
    };

    const deletePosition = (event) => {
        event.preventDefault();
        const arr = positions;
        if (row.current != null) {
            arr.splice(row.current - 1, 1);
            setPositions([...arr]);
            row.current = null;
        }
    };

    const highlightPosition = (event, number) => {
        const arr = highlight(number, [...positions], row);
        setPositions([...arr]);
    };

    const getPositionValues = (event, number, prop) => {
        const arr = getValue(event, number, [...positions], prop);
        setPositions([...arr]);
    };

    async function getPositions(waybillId) {
        try {
            const PositionsFromDB = await getData(
                process.env.REACT_APP_URL_BASE + pathname,
                {
                    [type]: waybillId,
                },
                () => dispatch(setAuthAction(true))
            );
            return PositionsFromDB;
        } catch (error) {
            console.log(error);
        }
    }

    async function fillStartPositions(positions) {
        const startPositions = positions.map(
            (position) =>
                new PositionClass(
                    position.item_number,
                    position.nomenclature,
                    position.quantity,
                    position.price,
                    position.summ,
                    position.nds,
                    position.total,
                    position.id
                )
        );

        setPositions([...startPositions]);
        setCounter(startPositions.length);
        setLoader((loader) => !loader);
    }

    return [
        loader,
        positions,
        addPosition,
        deletePosition,
        highlightPosition,
        getPositionValues,
        fillStartPositions,
        getPositions,
    ];
}
