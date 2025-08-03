import { MapPin, Users } from "lucide-react";

type Modalidad = "futbol11" | "futbol7"

interface ModalidadSelectorProps {
    onSelect: (modalidad: Modalidad) => void
}
export const ModalidadSelector = ({ onSelect }: ModalidadSelectorProps) => {


    return (
        <div className="space-y-4">
            <div className="text-center text-lg font-bold text-gray-900 mb-2 uppercase">
                Selecciona tipo de futbol:
            </div>
            <div className="space-y-4">
                <div
                    className="cursor-pointer hover:shadow-lg transition-shadow border-1 border-slate-300 hover:border-green-500 rounded-lg p-5 bg-white"
                    onClick={() => onSelect("futbol11")}
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-green-700 uppercase font-bold">Fútbol 11</div>
                        <div>Campo completo para 22 jugadores</div>
                    </div>
                    <div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Campo completo (105m x 68m)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>11 vs 11 jugadores</span>
                            </div>
                            <div className="text-lg font-bold text-green-600 mt-3">S/. 120.00 soles/hora</div>
                        </div>
                    </div>
                </div>

                <div
                    className="cursor-pointer hover:shadow-lg transition-shadow border-1 hover:border-blue-500 border-slate-300 rounded-lg p-5 bg-white"
                    onClick={() => onSelect("futbol7")}
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-blue-700 uppercase font-bold">Fútbol 7</div>
                        <div>Campo dividido en 4 secciones</div>
                    </div>
                    <div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>4 canchas disponibles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>7 vs 7 jugadores</span>
                            </div>
                            <div className="text-lg font-bold text-blue-600 mt-3">S/. 90.00 soles/hora</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};