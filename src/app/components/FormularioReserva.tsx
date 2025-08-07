import { ChevronLeft, CreditCard, Mail, Phone, User } from "lucide-react"
import { useState } from "react"
// import { useForm } from "react-hook-form"
import useApi from "../hooks/fetchData/useApi"
import { Button } from "@mui/material"
import { FormComprarTicket } from "./Forms/FormComprarTicket"
import "./styleButton.css"
import Swal from "sweetalert2"

type Modalidad = "futbol11" | "futbol7"

interface FormularioReservaProps {
    modalidad: Modalidad
    fecha: Date
    horario: string
    seccion: number | null
    onComplete: () => void
    onBack: () => void
}

export const FormularioReserva = ({ modalidad, fecha, horario, seccion, onComplete, onBack, getValues, setValue, handleSubmit, control, onSubmit }: any) => {

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        email: "",
        observaciones: "",
    })

    const precio = modalidad === "futbol11" ? 120 : 90

    // const { handleSubmit, control, getValues, setValue } = useForm()
    const { apiCall, loading, error } = useApi()

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // Aquí iría la lógica para procesar la reserva
    //     onComplete()
    // }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    console.log("getValues: ", getValues()?.horariosAll?.filter((x: any) => x.status == "1"))

    return (
        <>
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
                    <h2 className="text-lg font-semibold">Completar Reserva</h2>
                </div>

                {/* Resumen de la reserva */}
                {
                    getValues()?.typeCancha == "futbol11" &&
                    <div className="mt-8 border-1 border-gray-200 p-4 rounded-lg bg-white">
                        <div className="mb-3">
                            <div className="text-base">Resumen de Reserva:</div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Modalidad:</span>
                                <button className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg px-2 py-1 text-xs">
                                    {modalidad === "futbol11" ? "Fútbol 11 - Cancha Completa" : "Fútbol 7"}
                                    {seccion && modalidad !== "futbol11" && ` - Cancha ${seccion}`}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Fecha:</span>
                                <span className="font-medium">{fecha.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Horario:</span>
                                <span className="font-medium">{getValues()?.horariosAll?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="font-medium">Total:</span>
                                <span className="text-lg font-bold text-green-600">S/. {getValues()?.horariosAll?.filter((x: any) => x.status == "1")?.reduce((acum: any, item: any) => acum + Number(item.precio), 0).toLocaleString()} soles</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    getValues()?.typeCancha == "futbol7" &&
                    <div className="mt-8 border-1 border-gray-200 p-4 rounded-lg bg-white">
                        <div className="mb-3">
                            <div className="text-base">Resumen de Reserva:</div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Modalidad:</span>
                                <button className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg px-2 py-1 text-xs">
                                    {modalidad === "futbol11" ? "Fútbol 11 - Cancha Completa" : "Fútbol 7"}
                                    {seccion && modalidad !== "futbol11" && ` - Cancha ${seccion}`}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Fecha:</span>
                                <span className="font-medium">{fecha.toLocaleDateString()}</span>
                            </div>
                            {
                                getValues()?.horariosfutbol7cancha1?.some((x: any) => x.status == "1") &&
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Horario(s) Cancha 1:</span>
                                    <span className="font-medium">{getValues()?.horariosfutbol7cancha1?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                                </div>
                            }
                            {
                                getValues()?.horariosfutbol7cancha2?.some((x: any) => x.status == "1") &&
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Horario(s) Cancha 2:</span>
                                    <span className="font-medium">{getValues()?.horariosfutbol7cancha2?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                                </div>
                            }
                            {
                                getValues()?.horariosfutbol7cancha3?.some((x: any) => x.status == "1") &&
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Horario(s) Cancha 3:</span>
                                    <span className="font-medium">{getValues()?.horariosfutbol7cancha3?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                                </div>
                            }
                            {
                                getValues()?.horariosfutbol7cancha4?.some((x: any) => x.status == "1") &&
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Horario(s) Cancha 4:</span>
                                    <span className="font-medium">{getValues()?.horariosfutbol7cancha4?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                                </div>
                            }
                            {/* <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Horario:</span>
                                <span className="font-medium">{getValues()?.horariosAll?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", ")}</span>
                            </div> */}
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="font-medium">Total:</span>
                                <span className="text-lg font-bold text-green-600">S/. {getValues()?.horariosfutbol7cancha1?.concat(getValues()?.horariosfutbol7cancha2)?.concat(getValues()?.horariosfutbol7cancha3)?.concat(getValues()?.horariosfutbol7cancha4)?.filter((x: any) => x.status == "1")?.reduce((acum: any, item: any) => acum + Number(item.precio), 0).toLocaleString()} soles</span>
                            </div>
                        </div>
                    </div>
                }

                {/* Formulario */}
                <div>
                    <div>
                        <div className="text-base mb-3">Datos del Responsable:</div>
                    </div>
                    <div className="flex flex-col gap-2 bg-[rgba(255,255,255)] rounded-lg p-3 px-3 mt-0 w-full py-5 mb-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-3">
                                    <FormComprarTicket {...{ getValues, setValue, handleSubmit, control, apiCall, loading, error }} />
                                </div>
                                <div className="flex flex-row gap-3 w-full">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        className="w-full button-attention"
                                        disabled={loading}
                                    >
                                        Reservar Ahora
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}