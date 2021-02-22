# Caso de uso

## Comandos.

### Despliega proyecto.

```
make up
```

### Inserta seeders.

```
make seed
```

### Elimina contenedores.

```
make down
```

## Caso de uso: registra entrada:

```
localhost:3000/staies/register_entry
```

```json
// Body:
{
    "licensePlate": "xyz987"
}
```

## Caso de uso: registra salida:

```
localhost:3000/staies/register_exit
```

```json
// Body:
{
    "licensePlate": "xyz987"
}
```

## Caso de uso: alta vehículo residente:

```
localhost:3000/cars/:licensePlate/up_resident
licensePlate: Placa de vehículo.
```

## Caso de uso: alta vehículo oficial:

```
localhost:3000/cars/:licensePlate/up_oficial
licensePlate: Placa de vehículo.
```

## Caso de uso: Comienza el mes:

```
localhost:3000/periods/init_period
```

## Caso de uso: Pago de residentes:

```
localhost:3000/periods/:id/residents_pay
id: Identificador de periodo.
```