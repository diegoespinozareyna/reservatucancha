"use client";

import { CampoVisualizador } from "@/app/components/CampoVisualizador";
import { FormularioReserva } from "@/app/components/FormularioReserva";
import { HorarioSelector } from "@/app/components/HorarioSelector";
import { ModalidadSelector } from "@/app/components/TipoCancha";
import { useState } from "react";

type Modalidad = "futbol11" | "futbol7"
type Paso = "modalidad" | "horario" | "campo" | "reserva" | "confirmacion"

export default function SeleccionarCancha() {

    const [pasoActual, setPasoActual] = useState<Paso>("modalidad")
    const [modalidadSeleccionada, setModalidadSeleccionada] = useState<Modalidad | null>(null)
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null)
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null)
    const [seccionSeleccionada, setSeccionSeleccionada] = useState<number | null>(null)

    const handleModalidadSelect = (modalidad: Modalidad) => {
        setModalidadSeleccionada(modalidad)
        setPasoActual("horario")
    }

    const handleHorarioSelect = (fecha: Date, horario: string) => {
        setFechaSeleccionada(fecha)
        setHorarioSeleccionado(horario)
        setPasoActual("campo")
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
                        {["modalidad", "horario", "campo", "reserva"].map((paso, index) => (
                            <div
                                key={paso}
                                className={`w-3 h-3 rounded-full ${["modalidad", "horario", "campo", "reserva"].indexOf(pasoActual) >= index
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                {pasoActual === "modalidad" && <ModalidadSelector onSelect={handleModalidadSelect} />}

                {pasoActual === "horario" && modalidadSeleccionada && (
                    <HorarioSelector
                        modalidad={modalidadSeleccionada}
                        onSelect={handleHorarioSelect}
                        onBack={() => setPasoActual("modalidad")}
                    />
                )}

                {pasoActual === "campo" && modalidadSeleccionada && (
                    <CampoVisualizador
                        modalidad={modalidadSeleccionada}
                        fecha={fechaSeleccionada!}
                        horario={horarioSeleccionado!}
                        onSelect={handleCampoSelect}
                        onBack={() => setPasoActual("horario")}
                    />
                )}

                {pasoActual === "reserva" && (
                    <FormularioReserva
                        modalidad={modalidadSeleccionada!}
                        fecha={fechaSeleccionada!}
                        horario={horarioSeleccionado!}
                        seccion={seccionSeleccionada}
                        onComplete={handleReservaComplete}
                        onBack={() => setPasoActual("campo")}
                    />
                )}
            </div>
        </div>
    );
}