"use client"

import { useState } from "react"
import { Calendar, ChevronLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@mui/material"

type Modalidad = "futbol11" | "futbol7"

interface HorarioSelectorProps {
    modalidad: Modalidad
    onSelect: (fecha: Date, horario: string) => void
    handleHorarioSelect: (fecha: Date, horario: string) => void
    onBack: () => void
}

export function HorarioSelector({ modalidad, handleHorarioSelect, getValues, setValue, fetchHorarios, refScrollTarget1, refScrollTarget2, refScrollTarget3, refScrollTarget4, handleScroll }: any) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())

    const horarios = [
        "06:00 am",
        "07:00 am",
        "08:00 am",
        "09:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 pm",
        "01:00 pm",
        "02:00 pm",
        "03:00 pm",
        "04:00 pm",
        "05:00 pm",
        "06:00 pm",
        "07:00 pm",
        "08:00 pm",
        "09:00 pm",
        "10:00 pm",
        "11:00 pm",
    ]

    const horariosOcupados = ["09:00 am", "03:00 pm", "07:00 pm"] // Simulación de horarios ocupados

    const obtenerProximosDias = () => {
        const dias = []
        for (let i = 0; i < 30; i++) {
            const fecha = new Date()
            fecha.setDate(fecha.getDate() + i)
            dias.push(fecha)
        }
        return dias
    }

    const formatearFecha = (fecha: Date) => {
        const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
        const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic"]
        return {
            dia: dias[fecha.getDay()],
            numero: fecha.getDate(),
            mes: meses[fecha.getMonth()],
        }
    }

    return (
        <div className="space-y-4">

            {/* Selector de Fecha */}
            <div className=" rounded-lg border-2 border-gray-200 p-4 bg-[#fff]">
                <div>
                    <div className="text-base flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4" />
                        Seleccionar Fecha:
                    </div>
                </div>
                <div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {obtenerProximosDias().map((fecha, index) => {
                            const fechaInfo = formatearFecha(fecha)
                            const esSeleccionada = fecha.toDateString() === fechaSeleccionada.toDateString()

                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setFechaSeleccionada(fecha)
                                        if (getValues()?.typeCancha == "futbol11") {
                                            fetchHorarios(fecha)
                                        }
                                        else {
                                            console.log("entre3")
                                            setValue(`horariosAll`, [])
                                        }
                                    }}
                                    className={`flex-shrink-0 p-3 rounded-lg border-2 text-center min-w-[60px] ${esSeleccionada ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="text-xs text-gray-600">{fechaInfo.dia}</div>
                                    <div className="text-lg font-bold">{fechaInfo.numero}</div>
                                    <div className="text-xs text-gray-600">{fechaInfo.mes}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* <button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={onBack}>
                    <div className="flex items-center justify-center gap-1 rounded-md border-1 px-1">
                        <div>
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        <div className="-mt-0">
                            {"Atrás"}
                        </div>
                    </div>
                </button> */}
                <h2 className="text-lg font-semibold">
                    Seleccionar Horario - {modalidad === "futbol11" ? "Fútbol 11" : "Fútbol 7"}
                </h2>
            </div>

            {
                modalidad === "futbol11" &&
                <div className="mb-15">
                    {/* Selector de Horario */}
                    <div className=" rounded-lg border-2 border-gray-200 p-4 bg-[#fff]">
                        <div>
                            <div className="text-base mb-3">Horarios Disponibles:</div>
                        </div>
                        <div>
                            <div className="grid grid-cols-3 gap-2">
                                {horarios.map((horario, index) => {
                                    const estaOcupado = horariosOcupados.includes(horario)

                                    return (
                                        <button
                                            key={horario}
                                            className={`relative w-full rounded-lg border-2 text-center min-w-[60px] py-3 ${getValues(`horariosAll`)?.[index]?.status == "2" ? "border-gray-200 bg-green-50 hover:border-gray-300" : "border-gray-200"} ${(getValues()?.horariosAll?.[index]?.status == true) ? "border-2 border-green-500 hover:border-green-600 bg-green-100" : "border-gray-200 bg-green-50 hover:border-gray-300"} cursor-pointer`}
                                            disabled={getValues(`horariosAll`)?.[index]?.status == "2"}
                                            onClick={() => {
                                                if (getValues(`horariosAll`)?.[index]?.status == "1") {
                                                    setValue(`horariosAll.${index}`, {
                                                        ...getValues(`horariosAll`)?.[index],
                                                        value: horario,
                                                        status: "0"
                                                    })
                                                }
                                                else {
                                                    setValue(`horariosAll.${index}`, {
                                                        ...getValues(`horariosAll`)?.[index],
                                                        value: horario,
                                                        status: "1"
                                                    })
                                                }
                                                // else if (getValues(`horariosAll`)?.[index]?.status == null || getValues(`horariosAll`)?.[index]?.status == undefined) {
                                                //     setValue(`horariosAll.${index}`, {
                                                //         value: horario,
                                                //         status: false
                                                //     })
                                                // }
                                            }}
                                        // className="h-12 relative"
                                        >
                                            <div>
                                                <div>
                                                    {horario}
                                                </div>
                                                <div className="text-[11px] text-gray-600">
                                                    {`S/. ${Number(getValues()?.horariosAll?.[index]?.precio)?.toFixed(2)}`}
                                                </div>
                                            </div>
                                            {getValues(`horariosAll`)?.[index]?.status == "2" && (
                                                <div className="absolute -top-1 -right-1 text-xs px-1 text-white bg-red-400 rounded-lg">
                                                    Ocupado
                                                </div>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="fixed bottom-0 left-0 w-full p-4 bg-white z-50 shadow-md">
                                {
                                    getValues(`horariosAll`) &&
                                    <Button
                                        variant="contained"
                                        color="success"
                                        // type="submit"
                                        className="w-full button-attention"
                                        onClick={() => handleHorarioSelect(fechaSeleccionada, getValues(`horariosAll`)?.[0]?.value)}
                                    >
                                        SIGUIENTE
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                modalidad === "futbol7" &&
                <div className="mb-15">
                    {
                        ["cancha1", "cancha2", "cancha3", "cancha4"].map((cancha, indexAll) => {
                            return (
                                <>
                                    <div ref={indexAll == 0 ? refScrollTarget1 : indexAll == 1 ? refScrollTarget2 : indexAll == 2 ? refScrollTarget3 : refScrollTarget4} className=" rounded-lg border-2 border-gray-200 p-4 bg-[#fff] mt-4">
                                        <div>
                                            <div className="text-lg mb-3 font-bold">{`Horarios Disponibles Cancha ${indexAll + 1}:`}</div>
                                        </div>
                                        <div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {horarios.map((horario, index) => {
                                                    const estaOcupado = horariosOcupados.includes(horario)

                                                    return (
                                                        <button
                                                            key={horario}
                                                            className={`relative w-full rounded-lg border-2 text-center min-w-[60px] py-3 ${getValues(`horariosAll`)?.[index]?.status == "2" ? "border-gray-200 bg-green-50 hover:border-gray-300" : "border-gray-200"} ${(getValues()?.horariosCanchaFutbol7?.[indexAll]?.[index]?.status == true) ? "border-2 border-green-500 hover:border-green-600 bg-green-100" : "border-gray-200 bg-green-50 hover:border-gray-300"} cursor-pointer`}
                                                            disabled={getValues(`horariosAll`)?.[index]?.status == "2"}
                                                            onClick={() => {
                                                                if (getValues()?.horariosCanchaFutbol7?.[indexAll]?.[index]?.status == "1") {
                                                                    setValue(`horariosCanchaFutbol7.${indexAll}.${index}`, {
                                                                        ...getValues()?.horariosCanchaFutbol7?.[indexAll]?.[index],
                                                                        value: horario,
                                                                        status: "0"
                                                                    })
                                                                }
                                                                else {
                                                                    setValue(`horariosCanchaFutbol7.${indexAll}.${index}`, {
                                                                        ...getValues()?.horariosCanchaFutbol7?.[indexAll]?.[index],
                                                                        value: horario,
                                                                        status: "1"
                                                                    })
                                                                }
                                                                // else if (getValues(`horariosAll`)?.[index]?.status == null || getValues(`horariosAll`)?.[index]?.status == undefined) {
                                                                //     setValue(`horariosAll.${index}`, {
                                                                //         value: horario,
                                                                //         status: false
                                                                //     })
                                                                // }
                                                            }}
                                                        // className="h-12 relative"
                                                        >
                                                            {horario}
                                                            {getValues(`horariosAll`)?.[index]?.status == "2" && (
                                                                <div className="absolute -top-1 -right-1 text-xs px-1 text-white bg-red-400 rounded-lg">
                                                                    Ocupado
                                                                </div>
                                                            )}
                                                        </button>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className="fixed bottom-0 left-0 w-full p-4 bg-white z-50 shadow-md">
                        {
                            getValues()?.horariosCanchaFutbol7 &&
                            <Button
                                variant="contained"
                                color="success"
                                // type="submit"
                                className="w-full button-attention"
                                onClick={() => handleHorarioSelect(fechaSeleccionada, getValues(`horariosAll`)?.[0]?.value)}
                            >
                                SIGUIENTE
                            </Button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
