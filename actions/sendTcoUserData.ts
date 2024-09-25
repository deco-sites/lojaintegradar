import { AppContext } from "site/apps/site.ts";

export interface Props {
    fields: {};
    formGuid: string;
    portalId: string;
    context: {
        hutk: string;
        pageUri: string;
        pageName: string;
    };
    // legalConsentOptions: string;
}

export default async function action(
    props: Props,
    req: Request,
    ctx: AppContext,
) {
    const url =
        `https://api.hsforms.com/submissions/v3/integration/submit/${props.portalId}/${props.formGuid}`;

    const data = {
        submittedAt: Date.now(),
        skipValidation: true,
        fields: Object.entries(props.fields).map((entry) => ({
            "objectTypeId": "0-1",
            "name": entry[0],
            "value": entry[1],
        })),
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.text();
        console.log(result);
        return { "Success": result };
    } catch (error) {
        console.log("Error: ", error);
        return { "Error": error };
    }
}
