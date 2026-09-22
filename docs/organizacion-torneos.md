# Organización de torneos

En **Validación**, el botón **Organizar torneo** usa el cupo máximo del torneo para ofrecer sugerencias. Se puede confirmar el sorteo aunque todavía no haya equipos aprobados. El catálogo elegido al crear el torneo sirve de referencia; la configuración deportiva definitiva se guarda al confirmar el sorteo.

Cada cupo se representa mediante un lugar estable. Los aprobados en el momento del sorteo ocupan lugares reales y los demás aparecen como **Equipo 1**, **Equipo 2**, etc. Al aprobar un equipo nuevo durante Validación, este ocupa automáticamente el primer lugar pendiente sin modificar la tabla, los cruces ni las fechas sorteadas. Los partidos solo se crean en `matches` cuando sus dos lugares ya tienen equipos reales, evitando registros o equipos ficticios en la base de datos.

## Formatos

- **Liga:** todos contra todos a una o dos vueltas. Con diez equipos, cada equipo juega nueve partidos por vuelta.
- **Eliminación directa:** requiere exactamente 8, 16 o 32 cupos. El sorteo arma un cruce inicial para cada equipo y divide el cuadro entre lado izquierdo y derecho. El cuadro muestra desde el comienzo los lugares pendientes de las siguientes rondas y los completa con los ganadores. Como siempre parte de una potencia de dos, todos juegan en cada ronda y no existen avances automáticos.
- **Mixto:** primero se juega la liga y luego una potencia de dos de los mejores clasificados pasa a eliminación directa: 2, 4, 8, 16, etc. Por ejemplo, veinte equipos pueden jugar la liga y los cuatro primeros disputar un Final Four: primero contra cuarto y segundo contra tercero; los ganadores juegan la final.

Esta primera interfaz ofrece esos tres formatos. No incluye tercer puesto, consolación, doble eliminación ni eliminatorias de ida y vuelta.

Victoria: 3 puntos; empate: 1; derrota: 0. Las tablas muestran partidos jugados, ganados, empatados y perdidos, goles a favor, goles en contra, diferencia y puntos. Desempates: puntos, diferencia de goles, goles a favor y orden del sorteo. Las eliminatorias empatadas requieren una tanda de penaltis con ganador. Los penaltis no se suman a los goles de las tablas. Los goles por jugador y las tarjetas amarillas o rojas continúan registrándose en las estadísticas de cada partido.

## Flujo

1. Elegir Liga, Eliminación directa o Mixto y ajustar las vueltas o la potencia de dos que clasificará.
2. Elegir si se generan fechas. La programación automática usa un escenario, duración, intervalo entre partidos, partidos por día y días entre jornadas. Cada ronda comienza en otra jornada. El horario se introduce en la zona local del navegador y se envía como instante ISO.
3. Sortear y revisar equipos aprobados, lugares pendientes, cuadro inicial o calendario y total de partidos. Es posible repetir el sorteo antes de confirmar.
4. Confirmar guarda exactamente la distribución previsualizada y cambia el torneo a **Programado**. Los sorteos confirmados no se sobrescriben. Las inscripciones, revisiones y aprobaciones continúan abiertas durante Programado hasta completar el cupo; cada aprobación ocupa el siguiente lugar pendiente.
5. Desde **Clasificación**, revisar cómo se llenan los lugares y asignar o editar fechas. Para pasar de **Programado** a **En curso** sí se exige completar todos los cupos, resolver las solicitudes pendientes, validar las plantillas y asignar fecha a todos los partidos de la primera etapa.
6. En **En curso**, registrar resultados. Al completar todos los partidos de la etapa, **Resolver etapa y continuar** fija sus resultados y genera la siguiente etapa con sus participantes reales. Un partido cancelado debe reprogramarse y finalizarse para resolver la etapa.
7. **Confirmar campeón** resuelve la última etapa; luego se puede finalizar el torneo mediante su ciclo de vida.

## Persistencia y protección

`competition_plan` es un documento JSON versionado del torneo: reglas, sorteo, lugares, asignaciones de equipos, programación prevista, etapas, lados del cuadro, creador, fecha y campeón. Los partidos siguen en `matches`, con una clave de competencia única dentro del torneo y marcadores separados para penaltis. Las tablas se calculan por etapa desde resultados finalizados.

La generación y avance usan transacciones y bloqueo del torneo. Se verifica de nuevo el estado, los participantes y la ausencia de generación anterior. Una solicitud repetida no duplica partidos. Las etapas resueltas no permiten editar resultados ni cambiar sus equipos. Se exige permiso de administración para organizar o avanzar; los resultados siguen los permisos existentes de administradores y árbitro principal.

Los torneos anteriores conservan sus datos. Los que ya tienen encuentros manuales siguen con su flujo existente y no pueden recibir un sorteo por encima de esos encuentros. La migración no elimina datos ni modifica el mínimo de los torneos antiguos en la base: creación e inicio validan el mínimo de seis en la aplicación.

## API

Rutas autenticadas bajo `/api/tournaments/:id/competition`:

- `GET /`: organización, tablas y encuentros.
- `GET /options`: equipos aprobados, bloqueos y sugerencias (administrador).
- `POST /preview`: propuesta sin escritura.
- `POST /`: confirmación del sorteo.
- `POST /advance`: resolver etapa y generar la siguiente, o confirmar campeón.

Los partidos se actualizan con `PATCH /api/matches/:id`. Los campos nuevos `homePenalties` y `awayPenalties` deben enviarse juntos; no sustituyen el marcador del partido.

## Validación

```sh
npm run build
npm test -- --runInBand --runTestsByPath src/competition/competition.engine.spec.ts src/competition/competition.service.spec.ts src/matches/matches-competition.spec.ts src/tournaments/tournament-lifecycle.service.spec.ts src/tournaments/tournaments.service.spec.ts
```

Las pruebas recorren todas las sugerencias entre seis y treinta y dos participantes hasta obtener campeón. Comprueban el todos contra todos, el Final Four, los cuadros de 8, 16 y 32 equipos sin avances automáticos, las validaciones de cupo, tablas, penaltis, autorizaciones, solicitudes obsoletas y la correspondencia entre vista previa y persistencia. También cubren el sorteo con cero aprobados, lugares provisionales, llenado posterior y creación tardía de partidos.
