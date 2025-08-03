"use client"

import { useState } from "react"
import { Calendar, ChevronLeft } from "lucide-react"

type Modalidad = "futbol11" | "futbol7"

interface HorarioSelectorProps {
    modalidad: Modalidad
    onSelect: (fecha: Date, horario: string) => void
    onBack: () => void
}

export function HorarioSelector({ modalidad, onSelect, onBack }: HorarioSelectorProps) {
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
        for (let i = 0; i < 7; i++) {
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
            <div className="flex items-center gap-3">
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
                <h2 className="text-lg font-semibold">
                    Seleccionar Horario - {modalidad === "futbol11" ? "Fútbol 11" : "Fútbol 7"}
                </h2>
            </div>

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
                                    onClick={() => setFechaSeleccionada(fecha)}
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

            {/* Selector de Horario */}
            <div className=" rounded-lg border-2 border-gray-200 p-4 bg-[#fff]">
                <div>
                    <div className="text-base mb-3">Horarios Disponibles:</div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-2">
                        {horarios.map((horario) => {
                            const estaOcupado = horariosOcupados.includes(horario)

                            return (
                                <button
                                    key={horario}
                                    className={`relative w-full rounded-lg border-2 text-center min-w-[60px] py-3 ${!estaOcupado ? "border-gray-200 bg-green-50 hover:border-gray-300" : "border-gray-200"
                                        }`}
                                    disabled={estaOcupado}
                                    onClick={() => onSelect(fechaSeleccionada, horario)}
                                // className="h-12 relative"
                                >
                                    {horario}
                                    {estaOcupado && (
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
        </div>
    )
}
