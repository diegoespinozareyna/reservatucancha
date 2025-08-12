"use client"

import { PopUpGeneral } from '@/app/components/popup/PopUpGeneral';
import { Apis } from '@/app/configs/proyecto/proyectCurrent';
import { StatusLotes } from '@/app/configs/proyecto/statusLotes';
import { changeDecimales } from '@/app/functions/changeDecimales';
import useApi from '@/app/hooks/fetchData/useApi';
import { usePopupOpen } from '@/app/hooks/popupopen/usePopupOpen';
import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Calendar, CloudUpload, ListCheck, Loader2, PencilLine, Save, Search } from 'lucide-react';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import "moment/locale/es"; // 👈 Esto es obligatorio

export default function Dashboard() {

    const router = useRouter();
    const { apiCall, loading, error } = useApi();
    const { control, getValues, setValue, watch, reset, handleSubmit, formState: { errors } } = useForm()
    const formAll = watch()
    console.log("formAll: ", formAll)
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [datosFiltrados, setDatosFiltrados] = useState<any>(null);

    const [loading2, setLoading2] = useState<boolean>(false);

    const { openPopup, hangeStatePopUp } = usePopupOpen();

    const fetchData = async () => {
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getReservasPersonaFutbol`
        const jsonData = {
            fechaInicio: getValues()?.fechaInicio,
            fechaFin: getValues()?.fechaFin,
            documentoUsuario: getValues()?.documentoUsuario,
            // nombreCliente: getValues()?.nombreCliente,
            status: getValues()?.status,
        };

        try {
            const response = await apiCall({ method: "get", endpoint: url, data: null, params: jsonData });
            console.log("response", response);
            setDatosFiltrados(response?.data);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            // localStorage.removeItem("auth-token");
            // window.location.href = '/';
        }
    }

    const fetcConfigs = async () => {
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getConfigsReservaFutbol`
        try {
            const response = await apiCall({ method: "get", endpoint: url });
            console.log("response", response);
            if (response?.data?.length > 0) {
                reset({
                    precioDiaFutbol11: response?.data?.find((x: any) => x.proyecto == Apis?.PROYECTCURRENT)?.precioDiaFutbol11 ?? "",
                    precioNocheFutbol11: response?.data?.find((x: any) => x.proyecto == Apis?.PROYECTCURRENT)?.precioNocheFutbol11 ?? "",
                    precioDiaFutbol7: response?.data?.find((x: any) => x.proyecto == Apis?.PROYECTCURRENT)?.precioDiaFutbol7 ?? "",
                    precioNocheFutbol7: response?.data?.find((x: any) => x.proyecto == Apis?.PROYECTCURRENT)?.precioNocheFutbol7 ?? "",
                })
            }
        } catch (error) {
            console.error('Error al obtener datos de configs:', error);
            // localStorage.removeItem("auth-token");
            // window.location.href = '/';
        }
    }

    const handlePostConfigs = async (key: any, value: any) => {
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/postConfigsReservaFutbol`
        const jsonSend = {
            key: key,
            value: value,
            proyecto: Apis.PROYECTCURRENT,
        }
        try {
            const response = await apiCall({ method: "patch", endpoint: url, data: jsonSend })
            console.log("responsefuianl: ", response)
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados',
                    text: 'Se han actualizado los datos',
                    timer: 2000
                });
                fetcConfigs()
            }
        } catch (error) {
            console.error('Error al obtener datos de configs:', error);
            // localStorage.removeItem("auth-token");
            // window.location.href = '/';
        }
    }

    useEffect(() => {
        try {
            const token = localStorage.getItem('auth-token');
            const decoded: any = jwtDecode(token as string);
            console.log('Datos del usuario:', decoded?.user);
            setUser(decoded?.user);
            reset({
                fechaInicio: moment.tz("America/Lima").format("YYYY-MM-DD"),
                fechaFin: moment.tz("America/Lima").add(1, "days").format("YYYY-MM-DD"),
            })
            fetchData();
            fetcConfigs()
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            localStorage.removeItem("auth-token");
            Swal.fire({
                title: 'No tiene permisos o su Sesión a Expirado',
                text: 'Por favor, inicie sesión nuevamente',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
                preConfirm: () => {
                    router.push('/');
                },
            });
        }
    }, [])

    const onSubmit = async (data: any) => {
        fetchData();
    }

    const tipoFutbolWatch = watch("tipoFutbol");

    useEffect(() => {
        setValue("tipoCancha", null)
    }, [tipoFutbolWatch]);

    const handleChangeState = async (id: string, dni: string, nombres: string, canchas: any, fecha: any) => {
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/changeStatusReserva`;
        console.log("url", url);

        const { isConfirmed } = await Swal.fire({
            title: `Cambiar estado del pedido de ${nombres} - ${dni}`,
            html: `
            <select id="estado" class="swal2-input">
              <option value="">Selecciona un estado</option>
              <option value="0">Pendiente</option>
              <option value="1">Aprobado</option>
              <option value="2">Rechazado</option>
            </select>
            <textarea id="comentario" class="swal2-textarea" placeholder="Escribe un comentario"></textarea>
          `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            width: '400px',
            allowOutsideClick: () => !Swal.isLoading(),
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const estado = (document.getElementById('estado') as HTMLSelectElement).value;
                const comentario = (document.getElementById('comentario') as HTMLTextAreaElement).value.trim();

                if (!estado) {
                    Swal.showValidationMessage('Debes seleccionar un estado');
                    return;
                }

                if (!comentario) {
                    Swal.showValidationMessage('Debes escribir un comentario');
                    return;
                }

                try {
                    const response = await apiCall({
                        method: 'patch',
                        endpoint: url,
                        data: {
                            status: estado,
                            comentario,
                            id
                        }
                    });

                    if (response.status === 201) {
                        if (estado == "2") {
                            console.log("entreliuberar horarios")
                            console.log("entreliuberar canchas", canchas)
                            console.log("entreliuberar fecha", fecha)

                            const liberarHorarios = { ...canchas, fecha: fecha }

                            console.log("liberarHorarios", liberarHorarios)

                            const urlPagoUrl = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/liberarHorarios`;

                            const jsonSend = {
                                horarios: liberarHorarios,
                                proyecto: Apis.PROYECTCURRENT,
                            }

                            const response2 = await apiCall({
                                method: 'patch',
                                endpoint: urlPagoUrl,
                                data: jsonSend
                            })
                            console.log("responsefuianl: ", response2)

                        }
                        return { estado, comentario }; // Devuelve valores para usarlos fuera
                    } else {
                        Swal.showValidationMessage('Error al actualizar el estado');
                    }
                } catch (error) {
                    Swal.showValidationMessage(`Error al actualizar: ${error}`);
                }


            }
        });

        if (isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: `El estado del pedido fue actualizado correctamente.`,
                timer: 2000
            });

            fetchData();
        }
    };

    const handleGetVouchersAll = async (nOperacion: any) => {
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getVouchersReservaCancha`;
        const response = await apiCall({
            method: "get", endpoint: url, data: null, params: {
                // documentoUsuario: documentoUsuario,
                // fecha: fecha,
                // conceptoPago: cancha0,
                nOperacion: nOperacion,
                proyecto: Apis.PROYECTCURRENT,
            }
        });
        console.log("response", response);
        setValue("VouchersAll", response?.data);
    }

    const handleSubirVouchers = async () => {
        const datosPedido = getValues()?.dataPoUp?.infoOrder
        const nOperacion = getValues()?.dataPoUp?.nOperacion
        const fecha = getValues()?.dataPoUp?.fecha
        const documentoUsuario = getValues()?.dataPoUp?.documentoUsuario
        const condeptoPago = getValues()?.dataPoUp?.condeptoPago
        try {
            if (!getValues()?.dataVoucher) return alert("Selecciona una imagen");
            setLoading2(true)
            const formData = new FormData();
            formData.append("image", getValues()?.dataVoucher);
            const res: any = await axios.post(`${Apis.URL_APOIMENT_BACKEND_DEV2}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log("res", res);
            if (res.status == 200) {
                const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/subirVoucherReservaFutbol`;

                const jsonSend = {
                    conceptoPago: condeptoPago,
                    // codPedido: datosPedido?._id,
                    documentoUsuario: documentoUsuario,
                    estadoVerificacion: "0",
                    fechaPago: fecha,
                    fechaVerificacion: "",
                    formaPago: getValues()?.formaPago,
                    horarios: getValues()?.horariosAll?.filter((x: any) => x.status == "1")?.map((x: any) => x.horario).join(", "),
                    monto: getValues()?.monto,
                    nOperacion: nOperacion,
                    observaciones: "",
                    proyecto: Apis.PROYECTCURRENT,
                    status: "0", // "0" pendiente, "1" aceptado, "2" rechazado
                    url: res?.data?.url,
                }
                // const jsonSend = {
                //     codPedido: datosPedido?._id,
                //     nOperacion: nOperacion,
                //     documentoUsuario: datosPedido?.documentoUsuario,
                //     fechaPago: moment.tz("America/Lima").format("YYYY-MM-DD"),
                //     formaPago: getValues()?.formaPago,
                //     monto: getValues()?.monto,
                //     fechaVerificacion: "",
                //     estadoVerificacion: "0",
                //     conceptoPago: "pago pedido",
                //     status: "0", // "0" pendiente, "1" aceptado, "2" rechazado
                //     observaciones: "",
                //     proyecto: Apis.PROYECTCURRENT,
                //     url: res?.data?.url,
                // }

                const response = await apiCall({
                    method: 'post',
                    endpoint: url,
                    data: jsonSend
                })
                console.log("responsefuianl: ", response)
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Voucher subido',
                        text: 'Se ha subido el voucher',
                        timer: 2000
                    });
                    hangeStatePopUp(false)
                }
            }
        }
        catch (error) {
            console.error("Error al subir el voucher: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al subir el voucher',
                text: 'No se ha podido subir el voucher',
            });
        }
        finally {
            setLoading2(false)
            setValue("dataVoucher", null);
            setValue("monto", null);
            setValue("formaPago", null);
        }
    }

    const handleEditVoucher = async (id: string, nOperacion: string) => {
        console.log("id", id);
        const url = `${Apis.URL_APOIMENT_BACKEND_DEV}/api/auth/getEditVoucherReservaFutbol`;
        try {
            const response = await apiCall({
                method: "patch", endpoint: url, data: {
                    id: id,
                    status: getValues()?.status,
                    observaciones: getValues()?.observaciones,
                    proyecto: Apis.PROYECTCURRENT,
                }
            })
            console.log("response", response);
            if (response?.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Voucher editado',
                    text: 'Se ha editado el voucher',
                    timer: 2000
                });
                setValue("status", "");
                setValue("observaciones", "");
                await handleGetVouchersAll(nOperacion);
            }
        } catch (error) {
            console.error("Error al editar el voucher: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al editar el voucher',
                text: 'No se ha podido editar el voucher',
                timer: 2000
            })
        }
    }

    return (
        <>
            {
                user !== null ?
                    <div className="font-sans text-slate-800 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 relative z-50">
                        <div className="max-w-2xl mx-auto relative z-50">
                            <div className='mt-0 mb-3 uppercase text-center text-base font-bold text-black relative z-50'>
                                {"Reservas"}
                            </div>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} id="filtro">
                                    <div className='grid grid-cols-2 md:grid-cols-2 gap-3'>
                                        <div>
                                            <Controller
                                                name={`fechaInicio`}
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Fecha Inicio"
                                                        variant="outlined"
                                                        size="small"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={true}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(moment.tz(value, "America/Lima").format("YYYY-MM-DD"))
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Controller
                                                name={`fechaFin`}
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Fecha Fin"
                                                        variant="outlined"
                                                        size="small"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={true}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(moment.tz(value, "America/Lima").format("YYYY-MM-DD"))
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <Controller
                                                name={`documentoUsuario`}
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="DNI"
                                                        variant="outlined"
                                                        size="small"
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={false}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            // field.onChange(moment.tz(value, "America/Lima").format())
                                                            // value = value.replace(/[^0-9.,]/g, "");// Solo números positivos
                                                            // if (value.length > 12) value = value.slice(0, 12);
                                                            field.onChange(value)
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>
                                        {/* <div>
                                        <Controller
                                            name={`nombreCliente`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Nombre Cliente"
                                                    variant="outlined"
                                                    size="small"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                    required={true}
                                                    className="w-full"
                                                    onChange={(e: any) => {
                                                        let value = e.target.value;
                                                        // // field.onChange(moment.tz(value, "America/Lima").format())
                                                        // value = value.replace(/[^0-9.,]/g, "");// Solo números positivos
                                                        // if (value.length > 12) value = value.slice(0, 12); // Máximo 12 caracteres
                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                        </div> */}
                                        <div className='-mt-2'>
                                            <Controller
                                                name={`status`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Autocomplete
                                                        options={[
                                                            { value: "0", label: "Pendiente" },
                                                            { value: "1", label: "Aprobado" },
                                                            { value: "2", label: "Rechazado" },
                                                        ]}
                                                        getOptionLabel={(option: any) => option?.label}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        value={field.value}
                                                        onChange={(_, selectedOption) => {
                                                            field.onChange(selectedOption?.value ?? null);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required={false}
                                                                label="Status"
                                                                margin="dense"
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={!!fieldState.error}
                                                                helperText={fieldState.error ? fieldState.error.message : ""}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        height: 40, // Aquí defines la altura que deseas
                                                                        minHeight: 40,
                                                                        '& input': {
                                                                            padding: '0 8px',
                                                                            height: 40,
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                        {/* <div className='grid grid-cols-2 md:grid-cols-2 justify-start items-center gap-2'> */}
                                        {/* <div className='-mt-2 w-full'>
                                            <Controller
                                                name={`tipoFutbol`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Autocomplete
                                                        options={[
                                                            { value: "0", label: "Futbol 11" },
                                                            { value: "1", label: "Futbol 7" },
                                                        ]}
                                                        getOptionLabel={(option: any) => option?.label}
                                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        value={
                                                            field.value
                                                                ? ([
                                                                    { value: "0", label: "Futbol 11" },
                                                                    { value: "1", label: "Futbol 7" },
                                                                ]).find((opt) => opt.value === field.value) || null
                                                                : null
                                                        }
                                                        onChange={(_, selectedOption) => {
                                                            field.onChange(selectedOption?.value ?? null);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required={false}
                                                                label="Tipo de Futbol"
                                                                margin="dense"
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={!!fieldState.error}
                                                                helperText={fieldState.error ? fieldState.error.message : ""}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        height: 40, // Aquí defines la altura que deseas
                                                                        minHeight: 40,
                                                                        '& input': {
                                                                            padding: '0 8px',
                                                                            height: 40,
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className='-mt-2 w-full'>
                                            <Controller
                                                name={`tipoCancha`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Autocomplete
                                                        options={
                                                            getValues()?.tipoFutbol == "0" ?
                                                                [
                                                                    { value: "0", label: "Completa" },
                                                                ]
                                                                :
                                                                getValues()?.tipoFutbol == "1" ?
                                                                    [
                                                                        { value: "1", label: "Cancha 1" },
                                                                        { value: "2", label: "Cancha 2" },
                                                                        { value: "3", label: "Cancha 3" },
                                                                        { value: "4", label: "Cancha 4" },
                                                                    ]
                                                                    :
                                                                    [
                                                                        { value: "0", label: "Completa" },
                                                                        { value: "1", label: "Cancha 1" },
                                                                        { value: "2", label: "Cancha 2" },
                                                                        { value: "3", label: "Cancha 3" },
                                                                        { value: "4", label: "Cancha 4" },
                                                                    ]
                                                        }
                                                        getOptionLabel={(option: any) => option?.label}
                                                        value={
                                                            field.value
                                                                ? (getValues()?.tipoFutbol == "0" ?
                                                                    [
                                                                        { value: "0", label: "Completa" },
                                                                    ]
                                                                    :
                                                                    getValues()?.tipoFutbol == "1" ?
                                                                        [
                                                                            { value: "1", label: "Cancha 1" },
                                                                            { value: "2", label: "Cancha 2" },
                                                                            { value: "3", label: "Cancha 3" },
                                                                            { value: "4", label: "Cancha 4" },
                                                                        ]
                                                                        :
                                                                        [
                                                                            { value: "0", label: "Completa" },
                                                                            { value: "1", label: "Cancha 1" },
                                                                            { value: "2", label: "Cancha 2" },
                                                                            { value: "3", label: "Cancha 3" },
                                                                            { value: "4", label: "Cancha 4" },
                                                                        ]).find((opt) => opt.value === field.value) || null
                                                                : null
                                                        }
                                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        onChange={(_, selectedOption) => {
                                                            field.onChange(selectedOption?.value ?? null);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                required={false}
                                                                label="Tipo de Cancha"
                                                                margin="dense"
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={!!fieldState.error}
                                                                helperText={fieldState.error ? fieldState.error.message : ""}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    sx: {
                                                                        height: 40, // Aquí defines la altura que deseas
                                                                        minHeight: 40,
                                                                        '& input': {
                                                                            padding: '0 8px',
                                                                            height: 40,
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div> */}
                                    </div>
                                    {/* </div> */}
                                    <div className='grid grid-cols-1 md:grid-cols-1 gap-3 mt-2'>
                                        <div className='-mt-0'>
                                            <Button
                                                disabled={loading}
                                                loading={loading}
                                                sx={{ width: "100%", height: "40px" }}
                                                variant="contained"
                                                color="success"
                                                type="submit"
                                            >
                                                <div className='flex justify-center items-center gap-2'>
                                                    <div>
                                                        <Search size={15} />
                                                    </div>
                                                    <div className='mt-[0.10rem]'>
                                                        Buscar
                                                    </div>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-[auto_1fr_1fr] gap-5 justify-start items-center w-full mt-4'>
                                        <div className="text-base">Precios F11:</div>
                                        <div className='flex justify-start items-center gap-1'>
                                            <Controller
                                                name={`precioDiaFutbol11`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Día"
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={false}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <div>
                                                <button onClick={() => {
                                                    Swal.fire({
                                                        title: "¿Seguro que desea actualizar el precio de 'DIA F11'?",
                                                        icon: "warning",
                                                        confirmButtonText: 'Si',
                                                        cancelButtonText: 'Cancelar',
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        showLoaderOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        showCancelButton: true,
                                                        preConfirm: () => {
                                                            handlePostConfigs("precioDiaFutbol11", getValues()?.precioDiaFutbol11)
                                                        },
                                                    });
                                                }} className='bg-blue-400 hover:bg-blue-600 text-white text-lg rounded-md px-2 py-2 w-full' type="button">
                                                    <Save size={21} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex justify-start items-center gap-1'>
                                            <Controller
                                                name={`precioNocheFutbol11`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Noche"
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={false}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <div>
                                                <button onClick={() => {
                                                    Swal.fire({
                                                        title: "¿Seguro que desea actualizar el precio de 'NOCHE F11'?",
                                                        icon: "warning",
                                                        confirmButtonText: 'Si',
                                                        cancelButtonText: 'Cancelar',
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        showLoaderOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        showCancelButton: true,
                                                        preConfirm: () => {
                                                            handlePostConfigs("precioNocheFutbol11", getValues()?.precioNocheFutbol11)
                                                        },
                                                    });
                                                }} className='bg-blue-400 hover:bg-blue-600 text-white text-lg rounded-md px-2 py-2 w-full' type="button">
                                                    <Save size={21} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-[auto_1fr_1fr] gap-5 mt-2 justify-start items-center w-full'>
                                        <div className="text-base">Precios F7 :</div>
                                        <div className='flex justify-start items-center gap-1'>
                                            <Controller
                                                name={`precioDiaFutbol7`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Día"
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={false}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <div>
                                                <button onClick={() => {
                                                    Swal.fire({
                                                        title: "¿Seguro que desea actualizar el precio de 'DIA F7'?",
                                                        icon: "warning",
                                                        confirmButtonText: 'Si',
                                                        cancelButtonText: 'Cancelar',
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        showLoaderOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        showCancelButton: true,
                                                        preConfirm: () => {
                                                            handlePostConfigs("precioDiaFutbol7", getValues()?.precioDiaFutbol7)
                                                        },
                                                    });
                                                }} className='bg-blue-400 hover:bg-blue-600 text-white text-lg rounded-md px-2 py-2 w-full' type="button">
                                                    <Save size={21} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex justify-start items-center gap-1'>
                                            <Controller
                                                name={`precioNocheFutbol7`}
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Noche"
                                                        variant="outlined"
                                                        size="small"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        required={false}
                                                        className="w-full"
                                                        onChange={(e: any) => {
                                                            let value = e.target.value;
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <div>
                                                <button onClick={() => {
                                                    Swal.fire({
                                                        title: "¿Seguro que desea actualizar el precio de 'NOCHE F7'?",
                                                        icon: "warning",
                                                        confirmButtonText: 'Si',
                                                        cancelButtonText: 'Cancelar',
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        showLoaderOnConfirm: true,
                                                        allowOutsideClick: false,
                                                        showCancelButton: true,
                                                        preConfirm: () => {
                                                            handlePostConfigs("precioNocheFutbol7", getValues()?.precioNocheFutbol7)
                                                        },
                                                    });
                                                }} className='bg-blue-400 hover:bg-blue-600 text-white text-lg rounded-md px-2 py-2 w-full' type="button">
                                                    <Save size={21} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <Button
                                            disabled={loading}
                                            loading={loading}
                                            sx={{ width: "100%", height: "40px" }}
                                            variant="contained"
                                            color="info"
                                            type="button"
                                            onClick={() => router.push("/")}
                                        >
                                            <div className='flex justify-center items-center gap-2'>
                                                <div>
                                                    <Calendar size={15} />
                                                </div>
                                                <div className='mt-[0.10rem]'>
                                                    Ver Disponibilidad de Horarios
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                </form>
                                <div id="tabla" className='relative z-0'>
                                    <div className="mt-3 md:ml-[000px] base:ml-[000px] ml-[00px] relative z-0">
                                        {
                                            datosFiltrados?.length > 0 ?
                                                <div className="p-0 flex justify-center items-center relative z-0">
                                                    <div className="w-[100vw-100px] h-[43vh] md:h-[70vh] overflow-y-auto overflow-x-auto relative z-0">
                                                        <table className="w-[100vw-100px] h-[70vh] md:h-[70vh] bg-white border border-gray-200 rounded-lg shadow-md relative z-0">
                                                            <thead className="sticky top-0 z-10 bg-green-100">
                                                                <tr className="bg-green-600 text-left text-sm text-gray-50">
                                                                    <th className="p-3 border-b">Fecha</th>
                                                                    <th className="p-3 border-b">Status</th>
                                                                    <th className="p-3 border-b">Pago/Voucher</th>
                                                                    <th className="p-3 border-b">Usuario</th>
                                                                    <th className="p-3 border-b !w-[530px]">Canchas</th>
                                                                    <th className="p-3 border-b">Cancha Completa</th>
                                                                    <th className="p-3 border-b">Cancha 1</th>
                                                                    <th className="p-3 border-b">Cancha 2</th>
                                                                    <th className="p-3 border-b">Cancha 3</th>
                                                                    <th className="p-3 border-b">Cancha 4</th>
                                                                    <th className="p-3 border-b">Comentario</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {datosFiltrados?.map((pedido: any, index: number) => (
                                                                    <tr
                                                                        key={pedido._id}
                                                                        style={{ backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#ffffff" }}
                                                                        className="border-t text-sm text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <td className="p-3 uppercase">
                                                                            {moment.tz(pedido.fecha, "America/Lima").locale("es").format("dddd, DD/MM/YYYY")}
                                                                            {/* {pedido.fecha?.split?.("T")[0].split?.("-")[2]}-{pedido.fecha?.split?.("T")[0].split?.("-")[1]}-{pedido.fecha?.split?.("T")[0].split?.("-")[0]} */}
                                                                        </td>
                                                                        <td className="p-3">
                                                                            <div className="flex justify-start items-center gap-1">
                                                                                <button
                                                                                    disabled={pedido.status == "2"}
                                                                                    className={`text-xs ${pedido.status == "0" ? "bg-yellow-500 hover:bg-yellow-700" : pedido.status == "1" ? "bg-green-500 hover:bg-green-700" : pedido.status == "2" ? "bg-red-500 hover:bg-red-700 disabled:opacity-30" : "bg-yellow-500 hover:bg-yellow-700"} text-white px-2 py-1 rounded-lg`}
                                                                                    onClick={() => handleChangeState(pedido._id, pedido?.documentoUsuario, pedido?.nombresUsuario,
                                                                                        {
                                                                                            cancha0: pedido?.cancha0,
                                                                                            cancha1: pedido?.cancha1,
                                                                                            cancha2: pedido?.cancha2,
                                                                                            cancha3: pedido?.cancha3,
                                                                                            cancha4: pedido?.cancha4,
                                                                                        },
                                                                                        pedido?.fecha)}
                                                                                >
                                                                                    {pedido.status == "0" ? "Pendiente" : pedido.status == "1" ? "Aprobado" : pedido.status == "2" ? "Rechazado" : "Pendiente"}
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3">
                                                                            <div>
                                                                                {`S/. ${changeDecimales(pedido?.precio)}`}
                                                                            </div>
                                                                            <div className="flex justify-start items-center gap-2 mt-2">
                                                                                <div
                                                                                    onClick={() => {
                                                                                        hangeStatePopUp(true)
                                                                                        setValue("dataPoUp", {
                                                                                            title: `Subir Voucher de ${pedido?.nombres} - ${pedido?.documentoUsuario}`,
                                                                                            infoOrder: pedido,
                                                                                            action: "subirVoucher",
                                                                                            nOperacion: pedido?.nOperacion,
                                                                                            fecha: pedido.fecha,
                                                                                            documentoUsuario: pedido?.documentoUsuario,
                                                                                            condeptoPago: pedido?.cancha0 !== "futbol7" && `futbo11`,
                                                                                        })
                                                                                    }}
                                                                                    className={`text-xs bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-lg flex items-center cursor-pointer`}
                                                                                >
                                                                                    <CloudUpload size={15} />
                                                                                </div>
                                                                                <div
                                                                                    onClick={() => {
                                                                                        hangeStatePopUp(true)
                                                                                        handleGetVouchersAll(pedido?.nOperacion)
                                                                                        setValue("dataPoUp", {
                                                                                            title: `Voucher(s) de ${pedido?.nombres} - ${pedido?.documentoUsuario}`,
                                                                                            infoOrder: pedido,
                                                                                            action: "verVouchers",
                                                                                        })
                                                                                    }}
                                                                                    className={`rounded-md ${pedido?.urlsPago?.length > 0 ? `bg-green-500 hover:bg-green-700` : `bg-slate-500 hover:bg-slate-700`} text-white px-2 py-1 cursor-pointer`}
                                                                                >
                                                                                    <ListCheck size={15} className="text-green-50" />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3">
                                                                            {`${pedido?.documentoUsuario ?? ""} ${pedido?.nombres ?? ""} ${pedido?.apellidoPaterno ?? ""} ${pedido?.apellidoMaterno}`}
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div>
                                                                                        {pedido?.cancha0 !== "" && `Futbol 11 `}
                                                                                    </div>
                                                                                    <div>
                                                                                        {pedido?.cancha0 == "" && `Futbol 7`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center text-[11px]">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div className="flex flex-row justify-start items-center">
                                                                                        {pedido?.cancha0 !== "--" && `${pedido.cancha0.replace(/, /g, '\n')}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center text-[11px]">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div className="flex flex-row justify-start items-center">
                                                                                        {pedido?.cancha1 !== "--" && `${pedido.cancha1.replace(/, /g, '\n')}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center text-[11px]">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div className="flex flex-row justify-start items-center">
                                                                                        {pedido?.cancha2 !== "--" && `${pedido.cancha2.replace(/, /g, '\n')}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center text-[11px]">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div className="flex flex-row justify-start items-center">
                                                                                        {pedido?.cancha3 !== "--" && `${pedido.cancha3.replace(/, /g, '\n')}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3 !w-[350px]">
                                                                            <div className="flex flex-row gap-1 justify-start items-center text-[11px]">
                                                                                <div className='flex flex-col gap-1 justify-start items-center'>
                                                                                    <div className="flex flex-row justify-start items-center">
                                                                                        {pedido?.cancha4 !== "--" && `${pedido.cancha4.replace(/, /g, '\n')}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="p-3">
                                                                            <div className="grid grid-cols-2 justify-start items-center gap-1">
                                                                                {pedido?.comentario}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                :
                                                <div className="flex flex-col items-center justify-center gap-2 w-full md:ml-1">
                                                    <div className="text-center font-bold text-xl text-red-300">{"No se ha realizado ninguna reserva en este periodo..."}</div>
                                                    {/* <div className="font-bold text-xl text-red-300">{"en este periodo..."}</div>
                                <div className="font-bold text-base text-red-300">{""}</div> */}
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                openPopup &&
                                <PopUpGeneral getValues={getValues} setValue={setValue} control={control} hangeStatePopUp={hangeStatePopUp} handleSubirVouchers={handleSubirVouchers} handleEditVoucher={handleEditVoucher} loading2={loading2} />
                            }
                        </div >
                    </div >
                    :
                    <div className="font-sans text-slate-800 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
                        No tiene permisos para acceder a esta página o caducó su sesión...
                    </div>
            }
        </>
    )
}
