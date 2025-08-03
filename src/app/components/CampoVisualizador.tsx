import { ChevronLeft } from "lucide-react"
import { CampoIzquierda1 } from "./canchas/CampoIzquierda1"
import Image from "next/image"
import "./styleButton.css"

type Modalidad = "futbol11" | "futbol7"

interface CampoVisualizadorProps {
    modalidad: Modalidad
    fecha: Date
    horario: string
    onSelect: (seccion?: number) => void
    onBack: () => void
}

export const CampoVisualizador = ({ modalidad, fecha, horario, onSelect, onBack }: CampoVisualizadorProps) => {

    console.log(fecha)
    console.log(modalidad)
    console.log(horario)

    const precio = modalidad === "futbol11" ? 120 : 90

    return (
        <div className="space-y-4">
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
                    <h2 className="text-lg font-semibold">{modalidad === "futbol7" ? "Seleccionar Campo:" : "Campo completo:"}</h2>
                    <h2 className="text-transparent font-semibold">Seleccio</h2>
                </div>
                <div>
                    {
                        modalidad === "futbol7" &&
                        <div className="flex justify-center items-center gap-[0.05rem]">
                            <div onClick={() => onSelect(1)} className="relative">
                                <div className="absolute top-0 left-0 z-30">
                                    <button className="bg-[rgba(100,255,300,0.5)] h-[210px] w-full border-1 rounded-md mr-2 px-[0.5px] hover:bg-[rgba(200,200,200,0.5)] text-xs font-bold">Seleccionar Campo 1</button>
                                </div>
                                <div className="relative z-20">
                                    <Image className="transform rotate-180 mt-[0.15rem]" src="/canchaderecha.png" alt="campo" width={100} height={100} />
                                </div>
                            </div>
                            <div onClick={() => onSelect(2)} className="relative">
                                <div className="absolute top-0 left-0 z-30">
                                    <button className="bg-[rgba(100,255,300,0.5)] h-[210px] w-full border-1 rounded-md mr-2 px-[0.5px] hover:bg-[rgba(200,200,200,0.5)] text-xs font-bold">Seleccionar Campo 2</button>
                                </div>
                                <div className="relative z-20">
                                    <Image className="transform rotate-180 mt-[0.15rem]" src="/canchamedio1.png" alt="campo" width={94} height={94} />
                                </div>
                            </div>
                            <div onClick={() => onSelect(3)} className="relative">
                                <div className="absolute top-0 left-0 z-30">
                                    <button className="bg-[rgba(173,173,173,0.8)] h-[210px] w-full border-1 rounded-md mr-2 px-[0.5px]  flex justify-center items-center">
                                        <div className="text-center flex justify-center items-center bg-red-400 text-white rounded-md px-2 w-11/12">
                                            Ocupada
                                        </div>
                                    </button>
                                </div>
                                <div className="relative z-20">
                                    <Image className="scale-x-[-1] rotate-180 mt-[0.15rem]" src="/canchamedio1.png" alt="campo" width={94} height={94} />
                                </div>
                            </div>
                            <div onClick={() => onSelect(4)} className="relative">
                                <div className="absolute top-0 left-0 z-30">
                                    <button className="bg-[rgba(100,255,300,0.5)] h-[210px] w-full border-1 rounded-md mr-2 px-[0.5px] hover:bg-[rgba(200,200,200,0.5)] text-xs font-bold">Seleccionar Campo 4</button>
                                </div>
                                <div className="relative z-20">
                                    <Image className="scale-x-[-1] rotate-180 mt-[0.15rem]" src="/canchaderecha.png" alt="campo" width={100} height={100} />
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
                                    <div className="relative z-20">
                                        <Image className="transform rotate-180 mt-[0.15rem]" src="/canchacompleta.png" alt="campo" width={400} height={400} />
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => onSelect()} className="pt-4 w-full">
                                <button className="bg-green-500 hover:bg-green-700 text-white text-lg rounded-md px-2 py-3 w-full button-attention" type="button">
                                    SIGUIENTE
                                </button>
                            </div>
                        </div>
                    }
                    <div className="mt-8 border-1 border-gray-200 p-4 rounded-lg bg-white">
                        <div>
                            <div className="text-base">Resumen de Reserva</div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Modalidad:</span>
                                <button className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg px-2 py-1 text-xs">
                                    {modalidad === "futbol11" ? "Fútbol 11" : "Fútbol 7"}
                                    {/* {seccion && ` - Sección ${seccion}`} */}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Fecha:</span>
                                <span className="font-medium">{fecha.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Horario:</span>
                                <span className="font-medium">{horario}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="font-medium">Total:</span>
                                <span className="text-lg font-bold text-green-600">S/. {precio.toLocaleString()} soles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}