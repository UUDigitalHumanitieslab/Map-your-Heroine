import { COUNTRIES } from "./countries";

export interface IResponse {
    id?: number; // id exists only when retrieving from backend, so make it optional
    work: any;
    hero: any;
    responses: any;
}

const countries = COUNTRIES.concat({name: 'Other', code: 'OTHER'});
export const SURVEY = {
    "pages":[
      {
        "name":"Identification",
        "elements":[
          {"type":"rating","name":"identification_personality","title":"You identify with your hero(ine) because you find common qualities between your personality and that of the character.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"identification_intruiging","title":"You identifiy with your hero(ine) because you are able to explore intruiging experiences and moral boundaries through the character.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"identification_wishbelike","title":"You wish to be more like your hero(ine).","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}
        ],
        "title": "Identification",
        "description":"Read the following statements and decide to what extent you agree or disagree. Questions with a * are required."
      },{
        "name":"Appearance",
        "elements":[
          {"type":"radiogroup","name":"appearance_enable","title":"Do you have information about the appearance of your hero(ine)?","isRequired":true,"choices":[{"value":true,"text":"Yes"},{"value":false,"text":"No"}]},
          {"type":"rating","name":"appearance_beautiful","visibleIf":"{appearance_enable} = true","title":"You consider your hero(ine) beautiful.","isRequired":true,"requiredIf":"{appearance_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"appearance_wishlookedlike","visibleIf":"{appearance_enable} = true","title":"You wish you looked like your hero(ine).","isRequired":true,"requiredIf":"{appearance_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"appearance_influencefeelings","visibleIf":"{appearance_enable} = true","title":"The appearance of your hero(ine) influences your feelings towards them.","isRequired":true,"requiredIf":"{appearance_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"appearance_impact","visibleIf":"{appearance_enable} = true","title":"The hero(ine)'s appearance impacts their experience in the story.","isRequired":true,"requiredIf":"{appearance_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
          {"type":"rating","name":"appearance_aware","visibleIf":"{appearance_enable} = true","title":"The hero(ine) is aware of the effects of their appearance.","isRequired":true,"requiredIf":"{appearance_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}],
          "title":"Appearance"
        },{
          "name":"Gender identity",
          "elements":[
            {"type":"rating","name":"gender_definespersonality","title":"Your hero(ine)'s gender identity defines their personality","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"gender_embraces","title":"Your hero(ine) embraces their gender identity.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"gender_attempts_expectations","title":"Your hero(ine) attempts to fulfill social expectations derived from their gender.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"gender_struggles_expectations","title":"Your hero(ine) struggles to fulfill social expectations regarding their gender.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}],
          "title":"Gender identity",
          "description":"These questions are about the gender your hero identifies with (not to be confused with biological sex). Read the following statements and decide to what extent you agree or disagree."
        },{
          "name":"Agency",
          "elements":[
            {"type":"rating","name":"agency_responsible","title":"Your hero is responsible for the challenges they face.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"agency_independent","title":"Your hero(ine) acts independently in facing challenges and problems.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"agency_hindered","title":"Your hero(ine) is hindered by external factors in exerting their will.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"agency_environment","title":"Your hero(ine) considers the best interest of those around them.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"agency_development","title":"Your hero(ine) changes, develops, or learns throughout their challenges.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}],
          "title":"Agency",
          "description":"Agency is the extent to which a person is in control and can exert power. Read the following statements and decide to what extent you agree or disagree."
        },{
          "name":"Profession",
          "elements":[
            {"type":"radiogroup","name":"profession_enable","title":"Does your hero(ine) have a profession?","isRequired":true,"choices":[{"value":true,"text":"Yes"},{"value":false,"text":"No"}]},
            {"type":"rating","name":"profession_relevant_to_personality","visibleIf":"{profession_enable} = true","title":"The profession of your hero(ine) reveals aspects relevant to their personality.","isRequired":true,"requiredIf":"{profession_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"profession_social_status","visibleIf":"{profession_enable} = true","title":"The profession of your hero(ine) reveals reflects their social status.","isRequired":true,"requiredIf":"{profession_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"profession_growth","visibleIf":"{profession_enable} = true","title":"The profession of your hero(ine) enables their character to grow.","isRequired":true,"requiredIf":"{profession_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"profession_defines_life","visibleIf":"{profession_enable} = true","title":"The profession of your hero(ine) defines their life in a significant way.","isRequired":true,"requiredIf":"{profession_enable} = true","rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}],
          "title":"Profession"
        },{
          "name":"Personality traits","elements":[
            {"type":"rating","name":"personality_assertive","title":"Your hero(ine) is assertive.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_independent","title":"Your hero(ine) is independent.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_vain","title":"Your hero(ine) is vain.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_confident","title":"Your hero(ine) is confident.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_wellrounded","title":"Your hero(ine) is well rounded.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_honest","title":"Your hero(ine) is honest.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_loyal","title":"Your hero(ine) is loyal.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"},
            {"type":"rating","name":"personality_cooperative","title":"Your hero(ine) is cooperative.","isRequired":true,"rateMax":7,"minRateDescription":"Strongly disagree","maxRateDescription":"Strongly agree"}],
          "title":"Personality traits",
          "description":"Read the following statements and decide to what extent you agree or disagree."
        },{
          "name":"About you",
          "elements":[
            {
              "type": "radiogroup",
              "name": "participant_gender",
              "title": "What is your gender identity?",
              "isRequired": false,
              "choices": [
                { "value": "Male", "text": "Male" },
                { "value": "Female", "text": "Female" },
                { "value": "Other", "text": "Other" },
              ]
            },
            {
              "type": "radiogroup",
              "name": "participant_age",
              "title": "What is your age?",
              "isRequired": false,
              "choices": [
                { "value": "0-25", "text": "0-25" },
                { "value": "26-35", "text": "26-35" },
                { "value": "36-45", "text": "36-45" },
                { "value": "46-55", "text": "46-55" },
                { "value": "56-55", "text": "56-55" },
                { "value": "65+", "text": "65+" }
              ]
            },
            {
              "type": "dropdown",
              "name": "participant_nationality",
              "title": "What country would you describe as your nationality?",
              "isRequired": false,
              "choices": countries.map(country => country.name)
            }
          ],
        "title": "About you", "description": "Please answer the following questions about yourself. These questions are optional."
        }
      ]
    };
