import { ArrowBigUp, ChevronLeft, ChevronUp } from "lucide-react"
import { CampoIzquierda1 } from "./canchas/CampoIzquierda1"
import Image from "next/image"
import "./styleButton.css"
import { HorarioSelector } from "@/app/components/HorarioSelector";
import { useRef } from "react";
import { Button, IconButton } from "@mui/material";

type Modalidad = "futbol11" | "futbol7"

interface CampoVisualizadorProps {
    modalidad: Modalidad
    fecha: Date
    horario: string
    onSelect: (seccion?: number) => void
    handleHorarioSelect: (seccion?: number) => void
    onBack: () => void
}

export const CampoVisualizador = ({ modalidad, fecha, horario, onSelect, onBack, handleHorarioSelect, getValues, setValue, fetchHorarios }: any) => {

    const refScrollTarget1 = useRef<HTMLDivElement>(null);
    const refScrollTarget2 = useRef<HTMLDivElement>(null);
    const refScrollTarget3 = useRef<HTMLDivElement>(null);
    const refScrollTarget4 = useRef<HTMLDivElement>(null);

    const handleScroll = (name: any) => {
        name.current?.scrollIntoView({ behavior: "smooth" });
    };

    // console.log(fecha)
    // console.log(modalidad)
    // console.log(horario)

    const precio = modalidad === "futbol11" ? 120 : 90

    return (
        <div className="space-y-4">
            <div className="fixed top-0 left-0 p-1 bg-white z-50 shadow-md opacity-50 !rounded-full">
                {
                    getValues(`horariosAll`) &&
                    <IconButton
                        className="rounded-full"
                        onClick={() => window.scrollTo({
                            top: 1,
                            left: 1,
                            behavior: "smooth",
                        })}
                    >
                        <ChevronUp className="rounded-full" color="green" />
                    </IconButton>
                }
            </div>
            <div className=" flex flex-col justify-center items-center">
                <div className="text-center flex justify-between items-center mb-6 gap-2 w-full">
                    <button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={onBack}>
                        <div className="flex items-center justify-center gap-1 rounded-md border-1 px-1">
                            <div>
                                <ChevronLeft className="w-4 h-4" />
                            </div>
                            <div className="-mt-0">
                                {"Atrás"}
                            </div>
                        </div>
                    </button>
                </div>
                <div>
                    {
                        modalidad === "futbol7" &&
                        <div className="flex justify-center items-center gap-[0.05rem]">
                            <div className="relative flex flex-col gap-0 w-full">
                                <div className="relative z-20">
                                    <Image className="transform rotate-180 mt-[0.15rem]" src="/canchapartida4.png" alt="campo" width={400} height={400} />
                                </div>
                                <div className="flex flex-row gap-[0.15rem] w-full relative">
                                    <div
                                        onClick={() => {
                                            // setValue("cancha", "1")
                                            handleScroll(refScrollTarget1)
                                            setValue("typeCancha", "futbol7")
                                        }}
                                        className={`w-1/4 h-full border-1 rounded-md bg-[rgba(0,0,0,0.2)] text-center z-30 text-white ${getValues()?.cancha == "1" ? "bg-green-300 border-2 border-green-700 py-5 -mt-[36%]" : "button-attention -mt-[31%]"} cursor-pointer`}
                                    >
                                        Cancha 1
                                    </div>
                                    <div
                                        onClick={() => {
                                            // setValue("cancha", "2")
                                            handleScroll(refScrollTarget2)
                                            setValue("typeCancha", "futbol7")
                                        }}
                                        className={`w-1/4 h-full border-1 rounded-md bg-[rgba(0,0,0,0.2)] text-center z-30 text-white ${getValues()?.cancha == "2" ? "bg-green-300 border-2 border-green-700 py-5 -mt-[36%]" : "button-attention -mt-[31%]"} cursor-pointer`}
                                    >
                                        Cancha 2
                                    </div>
                                    <div
                                        onClick={() => {
                                            // setValue("cancha", "3")
                                            handleScroll(refScrollTarget3)
                                            setValue("typeCancha", "futbol7")
                                        }}
                                        className={`w-1/4 h-full border-1 rounded-md bg-[rgba(0,0,0,0.2)] text-center z-30 text-white ${getValues()?.cancha == "3" ? "bg-green-300 border-2 border-green-700 py-5 -mt-[36%]" : "button-attention -mt-[31%]"} cursor-pointer`}
                                    >
                                        Cancha 3
                                    </div>
                                    <div
                                        onClick={() => {
                                            // setValue("cancha", "4")
                                            handleScroll(refScrollTarget4)
                                            setValue("typeCancha", "futbol7")
                                        }}
                                        className={`w-1/4 h-full border-1 rounded-md bg-[rgba(0,0,0,0.2)] text-center z-30 text-white ${getValues()?.cancha == "4" ? "bg-green-300 border-2 border-green-700 py-5 -mt-[36%]" : "button-attention -mt-[31%]"} cursor-pointer`}
                                    >
                                        Cancha 4
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        modalidad === "futbol11" &&
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex justify-center items-center gap-[0.05rem]">
                                <div className="relative">
                                    {/* <div className="absolute top-0 left-0 z-30">
                                    <button className="bg-[rgba(100,255,300,0.5)] h-[210px] w-full border-1 rounded-md mr-2 px-[0.5px] hover:bg-[rgba(200,200,200,0.5)] text-xs font-bold">Seleccionar Campo</button>
                                </div> */}
                                    <div
                                        onClick={() => {
                                            // setValue("cancha", "1")
                                            setValue("typeCancha", "futbol11")
                                        }}
                                        className="relative z-20"
                                    >
                                        <Image className="transform rotate-180 mt-[0.15rem]" src="/cancha11.png" alt="campo" width={400} height={400} />
                                    </div>
                                </div>
                            </div>
                            {/* <div onClick={() => onSelect()} className="pt-4 w-full">
                                <button className="bg-green-500 hover:bg-green-700 text-white text-lg rounded-md px-2 py-3 w-full button-attention" type="button">
                                    SIGUIENTE
                                </button>
                            </div> */}
                        </div>
                    }
                </div>
            </div>
            <HorarioSelector
                modalidad={modalidad}
                handleHorarioSelect={handleHorarioSelect}
                getValues={getValues}
                setValue={setValue}
                fetchHorarios={fetchHorarios}
                refScrollTarget1={refScrollTarget1}
                refScrollTarget2={refScrollTarget2}
                refScrollTarget3={refScrollTarget3}
                refScrollTarget4={refScrollTarget4}
                handleScroll={handleScroll}
            // onBack={() => setPasoActual("campo")}
            />
        </div >
    )
}