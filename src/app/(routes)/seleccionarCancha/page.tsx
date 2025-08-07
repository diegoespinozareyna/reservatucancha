"use client";

import { CampoVisualizador } from "@/app/components/CampoVisualizador";
import { FormularioReserva } from "@/app/components/FormularioReserva";
import { HorarioSelector } from "@/app/components/HorarioSelector";
import { ModalidadSelector } from "@/app/components/TipoCancha";
import { Apis } from "@/app/configs/proyecto/proyectCurrent";
import useApi from "@/app/hooks/fetchData/useApi";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Modalidad = "futbol11" | "futbol7"
type Paso = "modalidad" | "horario" | "campo" | "reserva" | "confirmacion"

export default function SeleccionarCancha() {

    const router = useRouter()

    const { getValues, setValue, watch, reset, handleSubmit, control } = useForm()

    const { apiCall, loading, error } = useApi()

    const formAll = watch()
    console.log("formAll: ", formAll)
    const formHortarios11 = watch(`horariosAll`)
    console.log("formHortarios11: ", formHortarios11)

    // useEffect(() => {
    //     fetchHorarios(moment.tz(new Date(), "America/Lima").format())
    //     fetchHorariosFutbol7(moment.tz(new Date(), "America/Lima").format())
    //     reset({
    //         horariosPlantilla: getValues()?.horariosAll?.concat(getValues()?.horariosfutbol7cancha1?.concat(getValues()?.horariosfutbol7cancha2)?.concat(getValues()?.horariosfutbol7cancha3)?.concat(getValues()?.horariosfutbol7cancha4))
    //     })
    // }, [])

    console.log("getValues: ", getValues()?.horariosPlantilla)

    const [pasoActual, setPasoActual] = useState<Paso>("modalidad")
    const [modalidadSeleccionada, setModalidadSeleccionada] = useState<Modalidad | null>(null)
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null)
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null)
    const [seccionSeleccionada, setSeccionSeleccionada] = useState<number | null>(null)

    const handleModalidadSelect = (modalidad: Modalidad) => {
        setModalidadSeleccionada(modalidad)
        setPasoActual("campo")
    }

    const handleHorarioSelect = (fecha: Date, horario: string) => {
        setFechaSeleccionada(fecha)
        setHorarioSeleccionado(horario)
        setPasoActual("reserva")
    }

    const handleCampoSelect = (seccion?: number) => {
        if (modalidadSeleccionada === "futbol7") {
            setSeccionSeleccionada(seccion || null)
        }
        setPasoActual("reserva")
    }

    const handleReservaComplete = () => {
        setPasoActual("confirmacion")
    }

    const resetear = () => {
        setPasoActual("modalidad")
        setModalidadSeleccionada(null)
        setFechaSeleccionada(null)
        setHorarioSeleccionado(null)
        setSeccionSeleccionada(null)
    }

    const fetchHorarios = async (fecha: any) => {
        console.log("fecha: ", fecha)
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getFechaReservaFutbol`;
        const response = await apiCall({
            method: "get", endpoint: url, data: null, params: { fecha: fecha }
        })
        if (response?.status === 201) {
            console.log("responsefuianl: ", response)
            if (response?.data?.length > 0) {
                console.log("entre1")
                setValue(`horariosAll`, response?.data?.sort((a: any, b: any) => {
                    const parseTime = (str: any) => {
                        const [time, meridiem] = str.split(" ");
                        let [hours, minutes] = time.split(":").map(Number);

                        if (meridiem.toLowerCase() === "pm" && hours !== 12) {
                            hours += 12;
                        }
                        if (meridiem.toLowerCase() === "am" && hours === 12) {
                            hours = 0;
                        }

                        return hours * 60 + minutes;
                    };

                    return parseTime(a.horario) - parseTime(b.horario);
                }))
            }
            else {
                console.log("entre2")
                setValue(`horariosAll`, [
                    {
                        type: "futbol11",
                        horario: "06:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "07:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "08:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "09:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "10:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "11:00 am",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "12:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "01:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "02:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "03:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "04:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "05:00 pm",
                        status: "0",
                        precio: "220"
                    },
                    {
                        type: "futbol11",
                        horario: "06:00 pm",
                        status: "0",
                        precio: "280"
                    },
                    {
                        type: "futbol11",
                        horario: "07:00 pm",
                        status: "0",
                        precio: "280"
                    },
                    {
                        type: "futbol11",
                        horario: "08:00 pm",
                        status: "0",
                        precio: "280"
                    },
                    {
                        type: "futbol11",
                        horario: "09:00 pm",
                        status: "0",
                        precio: "280"
                    },
                    {
                        type: "futbol11",
                        horario: "10:00 pm",
                        status: "0",
                        precio: "280"
                    },
                    {
                        type: "futbol11",
                        horario: "11:00 pm",
                        status: "0",
                        precio: "280"
                    },
                ])
            }
        }
    }

    const fetchHorariosFutbol7 = async (fecha: any) => {
        console.log("fecha: ", fecha)
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getFechaReservaFutbol7`;
        const response = await apiCall({
            method: "get", endpoint: url, data: null, params: { fecha: fecha }
        })
        if (response?.status === 201) {
            console.log("responsefuianl: ", response)
            if (response?.data?.length > 0) {
                console.log("entre1")

                setValue("horariosfutbol7cancha1", response?.data?.[0]?.length > 0 ? response?.data?.[0]?.sort((a: any, b: any) => {
                    const parseTime = (str: any) => {
                        const [time, meridiem] = str.split(" ");
                        let [hours, minutes] = time.split(":").map(Number);

                        if (meridiem.toLowerCase() === "pm" && hours !== 12) {
                            hours += 12;
                        }
                        if (meridiem.toLowerCase() === "am" && hours === 12) {
                            hours = 0;
                        }

                        return hours * 60 + minutes;
                    };

                    return parseTime(a.horario) - parseTime(b.horario);
                }) : [
                    {
                        type: "futbol7",
                        horario: "06:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "12:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "01:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "02:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "03:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "04:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "05:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "06:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "1",
                    },
                ])

                setValue("horariosfutbol7cancha2", response?.data?.[1]?.length > 0 ? response?.data?.[1]?.sort((a: any, b: any) => {
                    const parseTime = (str: any) => {
                        const [time, meridiem] = str.split(" ");
                        let [hours, minutes] = time.split(":").map(Number);

                        if (meridiem.toLowerCase() === "pm" && hours !== 12) {
                            hours += 12;
                        }
                        if (meridiem.toLowerCase() === "am" && hours === 12) {
                            hours = 0;
                        }

                        return hours * 60 + minutes;
                    };

                    return parseTime(a.horario) - parseTime(b.horario);
                }) : [
                    {
                        type: "futbol7",
                        horario: "06:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "12:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "01:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "02:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "03:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "04:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "05:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "06:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "2",
                    },
                ])

                setValue("horariosfutbol7cancha3", response?.data?.[2]?.length > 0 ? response?.data?.[2]?.sort((a: any, b: any) => {
                    const parseTime = (str: any) => {
                        const [time, meridiem] = str.split(" ");
                        let [hours, minutes] = time.split(":").map(Number);

                        if (meridiem.toLowerCase() === "pm" && hours !== 12) {
                            hours += 12;
                        }
                        if (meridiem.toLowerCase() === "am" && hours === 12) {
                            hours = 0;
                        }

                        return hours * 60 + minutes;
                    };

                    return parseTime(a.horario) - parseTime(b.horario);
                }) : [
                    {
                        type: "futbol7",
                        horario: "06:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "12:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "01:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "02:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "03:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "04:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "05:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "06:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "3",
                    },
                ])

                setValue("horariosfutbol7cancha4", response?.data?.[3]?.length > 0 ? response?.data?.[3]?.sort((a: any, b: any) => {
                    const parseTime = (str: any) => {
                        const [time, meridiem] = str.split(" ");
                        let [hours, minutes] = time.split(":").map(Number);

                        if (meridiem.toLowerCase() === "pm" && hours !== 12) {
                            hours += 12;
                        }
                        if (meridiem.toLowerCase() === "am" && hours === 12) {
                            hours = 0;
                        }

                        return hours * 60 + minutes;
                    };

                    return parseTime(a.horario) - parseTime(b.horario);
                }) : [
                    {
                        type: "futbol7",
                        horario: "06:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 am",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "12:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "01:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "02:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "03:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "04:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "05:00 pm",
                        status: "0",
                        precio: "60",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "06:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "07:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "08:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "09:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "10:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                    {
                        type: "futbol7",
                        horario: "11:00 pm",
                        status: "0",
                        precio: "100",
                        cancha: "4",
                    },
                ])
            }
            else {
                console.log("entre2")
                setValue(`horariosCanchaFutbol7`, [
                    [
                        {
                            type: "futbol7",
                            value: "06:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "12:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "01:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "02:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "03:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "04:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "05:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "06:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 pm",
                            status: "0",
                            precio: "100"
                        },
                    ],
                    [
                        {
                            type: "futbol7",
                            value: "06:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "12:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "01:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "02:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "03:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "04:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "05:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "06:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 pm",
                            status: "0",
                            precio: "100"
                        },
                    ],
                    [
                        {
                            type: "futbol7",
                            value: "06:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "12:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "01:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "02:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "03:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "04:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "05:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "06:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 pm",
                            status: "0",
                            precio: "100"
                        },
                    ],
                    [
                        {
                            type: "futbol7",
                            value: "06:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 am",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "12:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "01:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "02:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "03:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "04:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "05:00 pm",
                            status: "0",
                            precio: "60"
                        },
                        {
                            type: "futbol7",
                            value: "06:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "07:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "08:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "09:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "10:00 pm",
                            status: "0",
                            precio: "100"
                        },
                        {
                            type: "futbol7",
                            value: "11:00 pm",
                            status: "0",
                            precio: "100"
                        },
                    ],
                ])
            }
        }
        else {
            setValue(`horariosCanchaFutbol7`, [
                [
                    {
                        type: "futbol7",
                        value: "06:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "12:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "01:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "02:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "03:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "04:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "05:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "06:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 pm",
                        status: "0",
                        precio: "100"
                    },
                ],
                [
                    {
                        type: "futbol7",
                        value: "06:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "12:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "01:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "02:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "03:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "04:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "05:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "06:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 pm",
                        status: "0",
                        precio: "100"
                    },
                ],
                [
                    {
                        type: "futbol7",
                        value: "06:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "12:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "01:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "02:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "03:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "04:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "05:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "06:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 pm",
                        status: "0",
                        precio: "100"
                    },
                ],
                [
                    {
                        type: "futbol7",
                        value: "06:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 am",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "12:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "01:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "02:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "03:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "04:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "05:00 pm",
                        status: "0",
                        precio: "60"
                    },
                    {
                        type: "futbol7",
                        value: "06:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "07:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "08:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "09:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "10:00 pm",
                        status: "0",
                        precio: "100"
                    },
                    {
                        type: "futbol7",
                        value: "11:00 pm",
                        status: "0",
                        precio: "100"
                    },
                ],
            ])
        }
    }
    useEffect(() => {
        if (pasoActual == "campo" && getValues()?.typeCancha == "futbol11") {
            fetchHorarios(moment.tz(new Date(), "America/Lima").format())
            fetchHorariosFutbol7(moment.tz(new Date(), "America/Lima").format())
        }
        else if (pasoActual == "campo" && getValues()?.typeCancha == "futbol7") {
            console.log("entre4")
            fetchHorarios(moment.tz(new Date(), "America/Lima").format())
            fetchHorariosFutbol7(moment.tz(new Date(), "America/Lima").format())
        }
    }, [pasoActual])

    const onSubmit = async (data: any) => {
        console.log("data: ", data);
        console.log("data.nombres: ", data.nombres);
        console.log("data.apellidoPaterno: ", data.apellidoPaterno);
        console.log("data.apellidoMaterno: ", data.apellidoMaterno);
        console.log("data.celular: ", data.celular);
        const jsonSend11 = getValues()?.horariosAll?.map((horario: any, index: any) => {
            return {
                fecha: moment.tz(fechaSeleccionada, "America/Lima").format(),
                cancha: "0",
                status: horario?.status == "1" ? "2" : horario?.status,
                horario: horario?.horario,
                precio: horario?.precio?.toString(),
                documentoUsuario:
                    (horario?.documentoUsuario !== null && horario?.documentoUsuario !== undefined && horario?.documentoUsuario !== "")
                        ? horario?.documentoUsuario
                        : horario?.status == "1" ? data.documentoUsuario
                            : null,
                nombres:
                    (horario?.nombres !== null && horario?.nombres !== undefined && horario?.nombres !== "")
                        ? horario.nombres
                        : horario?.status == "1" ? data?.nombres
                            : null,
                apellidoPaterno:
                    (horario?.apellidoPaterno !== null && horario?.apellidoPaterno !== undefined && horario?.apellidoPaterno !== "")
                        ? horario.apellidoPaterno
                        : horario?.status == "1" ? data?.apellidoPaterno
                            : null,
                apellidoMaterno:
                    (horario?.apellidoMaterno !== null && horario?.apellidoMaterno !== undefined && horario?.apellidoMaterno !== "")
                        ? horario.apellidoMaterno
                        : horario?.status == "1" ? data?.apellidoMaterno
                            : null,
            }
        })
        const jsonSend7 = getValues()?.horariosfutbol7cancha1?.concat(getValues()?.horariosfutbol7cancha2)?.concat(getValues()?.horariosfutbol7cancha3)?.concat(getValues()?.horariosfutbol7cancha4)?.map((horario: any, index: any) => {
            return {
                fecha: moment.tz(fechaSeleccionada, "America/Lima").format(),
                cancha: horario?.cancha,
                status: horario?.status == "1" ? "2" : horario?.status,
                horario: horario?.horario,
                precio: horario?.precio?.toString(),
                documentoUsuario:
                    (horario?.documentoUsuario !== null && horario?.documentoUsuario !== undefined && horario?.documentoUsuario !== "")
                        ? horario?.documentoUsuario
                        : horario?.status == "1" ? data.documentoUsuario
                            : null,
                nombres:
                    (horario?.nombres !== null && horario?.nombres !== undefined && horario?.nombres !== "")
                        ? horario.nombres
                        : horario?.status == "1" ? data?.nombres
                            : null,
                apellidoPaterno:
                    (horario?.apellidoPaterno !== null && horario?.apellidoPaterno !== undefined && horario?.apellidoPaterno !== "")
                        ? horario.apellidoPaterno
                        : horario?.status == "1" ? data?.apellidoPaterno
                            : null,
                apellidoMaterno:
                    (horario?.apellidoMaterno !== null && horario?.apellidoMaterno !== undefined && horario?.apellidoMaterno !== "")
                        ? horario.apellidoMaterno
                        : horario?.status == "1" ? data?.apellidoMaterno
                            : null,
            }
        })
        console.log("jsonSend11: ", jsonSend11);
        console.log("jsonSend7: ", jsonSend7);
        const url1 = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/reservaFutbol`;
        const url2 = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/reservaFutbol7`;
        if (modalidadSeleccionada === "futbol11" || getValues()?.typeCancha === "futbol11") {
            console.log("entre1")
            try {
                const response = await apiCall({
                    method: "post", endpoint: url1, data: jsonSend11
                })
                console.log("responsefuianl: ", response)

                if (response.status === 201) {
                    Swal.fire({
                        title: "¡Reserva completa!",
                        text: "¡Se ha completado la reserva!",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        // cancelButtonText: 'No',
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false,
                        preConfirm: () => {
                            setPasoActual("modalidad")
                            reset()
                        },
                    });
                }
            } catch (error) {
                console.log("error: ", error)
                Swal.fire({
                    title: "¡Ocurrio un error!",
                    text: "¡Se ha completado la reserva!",
                    icon: "error",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                    // cancelButtonText: 'No',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        // setPasoActual("modalidad")
                    },
                });
            }
        }
        if (modalidadSeleccionada === "futbol7" || getValues()?.typeCancha === "futbol7") {
            console.log("entre1")
            try {
                const response = await apiCall({
                    method: "post", endpoint: url2, data: jsonSend7
                })
                console.log("responsefuianl: ", response)

                if (response.status === 201) {
                    Swal.fire({
                        title: "¡Reserva completa!",
                        text: "¡Se ha completado la reserva!",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        // cancelButtonText: 'No',
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false,
                        preConfirm: () => {
                            setPasoActual("modalidad")
                            reset()
                        },
                    });
                }
            } catch (error) {
                console.log("error: ", error)
                Swal.fire({
                    title: "¡Ocurrio un error!",
                    text: "¡Se ha completado la reserva!",
                    icon: "error",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                    // cancelButtonText: 'No',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    preConfirm: () => {
                        // setPasoActual("modalidad")
                    },
                });
            }
        }
        console.log("entre2")
    }

    return (
        <div className="font-sans text-slate-800 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2 uppercase">⚽ Campo Deportivo</h1>
                    <p className="text-gray-600">Reserva tu cancha favorita</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                        {["modalidad", "campo", "reserva"].map((paso, index) => (
                            <div
                                key={paso}
                                className={`w-3 h-3 rounded-full ${["modalidad", "campo", "reserva"].indexOf(pasoActual) >= index
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                {pasoActual === "modalidad" && <ModalidadSelector
                    onSelect={handleModalidadSelect}
                    getValues={getValues}
                    setValue={setValue}
                />}

                {pasoActual === "campo" && modalidadSeleccionada && (
                    <CampoVisualizador
                        modalidad={modalidadSeleccionada}
                        fecha={fechaSeleccionada!}
                        horario={horarioSeleccionado!}
                        onSelect={handleCampoSelect}
                        onBack={() => setPasoActual("modalidad")}
                        handleHorarioSelect={handleHorarioSelect}
                        getValues={getValues}
                        setValue={setValue}
                        fetchHorarios={fetchHorarios}
                        fetchHorariosFutbol7={fetchHorariosFutbol7}
                    />
                )}

                {/* {pasoActual === "horario" && modalidadSeleccionada && (
                    <HorarioSelector
                        modalidad={modalidadSeleccionada}
                        onSelect={handleHorarioSelect}
                        onBack={() => setPasoActual("campo")}
                    />
                )} */}

                {pasoActual === "reserva" && (
                    <FormularioReserva
                        modalidad={modalidadSeleccionada!}
                        fecha={fechaSeleccionada!}
                        horario={horarioSeleccionado!}
                        seccion={seccionSeleccionada}
                        onComplete={handleReservaComplete}
                        onBack={() => setPasoActual("campo")}
                        getValues={getValues}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                        control={control}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
        </div>
    );
}