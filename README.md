### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuelva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?

**Preguntas**

* ¿Qué es un Azure Function?

Un Azure Function es una solución para ejecutar fácilmente pequeños fragmentos de código o de funciones en la nube. Toma los conceptos básicos de los WebJobs y los amplía

* ¿Qué es serverless?

La computación sin servidor (serverless) es un modelo de ejecución en el que el proveedor en la nube es responsable de ejecutar un fragmento de código mediante la asignación dinámica de los recursos y cobra solo por la cantidad de recursos utilizados para ejecutar el código.

* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?

Este valor crea un proyecto de función que usa la versión 2.x del entorno de ejecución de Azure Functions, que es compatible con .NET Core. Azure Functions 1.x admite .NET Framework.

* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?

Es necesario asignar o crear un Storage Account, debido a que una función de Azure necesita una cuenta de almacenamiento.

* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.

Azure Functions tiene tres planes de servicio diferentes: Plan de consumo, plan Premium y plan Dedicado (App Service).

El plan de hospedaje que elija determina cómo se escala la aplicación de funciones, los recursos disponibles para cada instancia de aplicación de funciones, compatibilidad con características avanzadas y la conectividad con Azure Virtual Network.

Los planes de consumo y Prémium agregan automáticamente la capacidad de proceso cuando se ejecuta su código. La aplicación se escala horizontalmente cuando es necesario para administrar la carga, y se reduce horizontalmente cuando el código se deja de ejecutar. En el caso del plan de consumo, tampoco tiene que pagar para las VM inactivas ni la capacidad reservada de antemano.

El plan Prémium proporciona características adicionales, como instancias de proceso prémium, la capacidad de conservar las instancias semiactivas indefinidamente y la conectividad de red virtual.

El plan de App Service le permite aprovechar la infraestructura dedicada que administra. Su aplicación de funciones no se escala en función de los eventos, lo que significa que nunca se reduce horizontalmente a cero. (Requiere que la configuración Always On esté habilitada).

El plan de consumo es el plan de hospedaje predeterminado y ofrece las siguientes ventajas:

    1- Pague solo cuando se ejecutan las funciones
    2- Escale horizontalmente de forma automática, incluso durante períodos de gran carga

 El plan Prémium admite las características siguientes:

    1- Instancias permanentemente semiactivas para evitar cualquier inicio en frío
    2- Conectividad de red virtual
    3- Duración de la ejecución ilimitada (60 minutos garantizados)
    4- Tamaños de la instancia Prémium (un núcleo, dos núcleos y cuatro instancias de núcleo)
    5- Precios más previsibles
    6- Asignación de aplicaciones de alta densidad para planes con varias aplicaciones de funciones

Con un plan de App Service, para escalar horizontalmente de forma manual, puede agregar más instancias de máquina virtual. También puede habilitar el escalado automático. Considere el plan de App Service en las situaciones siguientes:

    1- Tiene máquinas virtuales infrautilizadas que ya ejecutan otras instancias de App Service.
    2- Quiere proporcionar una imagen personalizada en la que ejecutar sus funciones.

* ¿Cómo funciona el sistema de facturación de las Function App?

El plan de consumo de Azure Functions se factura en función del consumo de recursos y las ejecuciones por segundo. Los precios del plan de consumo incluyen una concesión gratuita mensual de 1 millones de solicitudes y 400.000 GB-segundos de consumo de recursos por suscripción en el modelo de precios de pago por uso, para todas las aplicaciones de funciones de esa suscripción. El plan Azure Functions Premium proporciona un rendimiento mejorado y se factura por segundo en función del número de vCPU/s y de GB/s que consuman sus funciones premium. Los clientes también puede ejecutar Functions dentro de su plan de App Service a las tarifas normales del plan de App Service. 

![](https://raw.githubusercontent.com/AndresFelipeGualdron/arsw-lab9/master/images/precios.JPG)

* Informe

Resultado de modificar la colección de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes:

![](https://raw.githubusercontent.com/AndresFelipeGualdron/arsw-lab9/master/images/informepunto5.jpeg)

Resultado de modificar la Function anteior para que resuelva el problema de Fibonacci pero utilizando un enfoque recursivo con memoization:

![](https://raw.githubusercontent.com/AndresFelipeGualdron/arsw-lab9/master/images/informepunto6.jpeg)

**Referencias**

* https://www.bravent.net/azure-function-caracteristicas-ventajas
* https://serverless-stack.com/chapters/es/what-is-serverless.html
* https://docs.microsoft.com/es-es/azure/azure-functions/functions-create-function-app-portal
* https://docs.microsoft.com/es-es/azure/azure-functions/functions-scale
* https://docs.microsoft.com/es-es/azure/azure-functions/functions-create-your-first-function-visual-studio 
* https://azure.microsoft.com/es-es/pricing/details/functions/ 