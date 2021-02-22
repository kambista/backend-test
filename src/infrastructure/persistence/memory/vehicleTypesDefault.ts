import { VEHICLE_TYPE } from "../../../domain/shared/consts";

export const vehicleTypeDefault =[
    {
        "_id": VEHICLE_TYPE.OFICIAL,
        "name": "Oficial",
        "parkingPrice": 0
    },
    {
        "_id": VEHICLE_TYPE.RESIDENTE,
        "name": "Residente",
        "parkingPrice": 0.05
    },
    {
        "_id": VEHICLE_TYPE.NO_RESIDENTE,
        "name": "No Residente",
        "parkingPrice": 0.5
    }
]