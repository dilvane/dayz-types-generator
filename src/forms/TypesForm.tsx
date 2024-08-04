// @ts-nocheck
import { TextField, SelectField, CheckField } from "fields";
import { Form, Formik } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "Modal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Flex, Box, Label, Text, Image, Button } from "theme-ui";
import * as Yup from "yup";
const { object, string, number, array, mixed } = Yup;

const categories = [
  { value: "clothes", label: "Clothes" },
  { value: "containers", label: "Containers" },
  { value: "explosives", label: "Explosives" },
  { value: "food", label: "Food" },
  { value: "tools", label: "Tools" },
  { value: "weapons", label: "Weapons" },
  { value: "vehiclesparts", label: "Vehiclesparts" },
];

const tags = [
  { value: "shelves", label: "Shelves" },
  { value: "floor", label: "Floor" },
];

const usages = [
  { value: "coast", label: "Coast" },
  { value: "farm", label: "Farm" },
  { value: "firefighter", label: "Firefighter" },
  { value: "hunting", label: "Hunting" },
  { value: "industrial", label: "Industrial" },
  { value: "medic", label: "Medic" },
  { value: "military", label: "Military" },
  { value: "office", label: "Office" },
  { value: "police", label: "Police" },
  { value: "prison", label: "Prison" },
  { value: "school", label: "School" },
  { value: "town", label: "Town" },
  { value: "village", label: "Village" },
];

const valuesItems = [
  { value: "tier1", label: "Tier1" },
  { value: "tier2", label: "Tier2" },
  { value: "tier3", label: "Tier3" },
  { value: "tier4", label: "Tier4" },
];

const defaultShape = (values) =>
  object().shape({
    value: string()
      .oneOf(values.map((i) => i.value.toLowerCase()))
      .required(),
    label: string().required(),
  });

export const validationSchema = object().shape({
  temporaryItem: Yup.boolean(),
  name: string().required(),
  nominal: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  lifetime: number().required(),
  restock: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  min: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  quantmin: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  quantmax: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  cost: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => number().required(),
  }),
  flags: object().shape({
    count_in_cargo: Yup.boolean(),
    count_in_hoarder: Yup.boolean(),
    count_in_map: Yup.boolean(),
    count_in_player: Yup.boolean(),
    crafted: Yup.boolean(),
    deloot: Yup.boolean(),
  }),
  category: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => defaultShape(categories).nullable(),
  }),
  tag: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => defaultShape(tags).nullable(),
  }),
  usage: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => array().of(defaultShape(usages)).nullable(),
  }),
  value: mixed().when("temporaryItem", {
    is: true,
    then: (schema) => string().nullable(),
    otherwise: (schema) => array().of(defaultShape(valuesItems)).nullable(),
  }),
});

const initialValuesDefault: any = {
  name: "",
  nominal: null,
  lifetime: 7200,
  restock: 1800,
  min: null,
  quantmin: null,
  quantmax: null,
  cost: 100,
  flags: {
    count_in_cargo: false,
    count_in_hoarder: false,
    count_in_map: false,
    count_in_player: false,
    crafted: false,
    deloot: false,
  },
  category: null,
  tag: null,
  usage: [],
  value: [],
};

export const TypesForm = ({
  onSubmit,
  action,
  id,
  data,
  initialValues = initialValuesDefault,
}) => (
  <Formik
    validateOnMount={false}
    initialValues={initialValues}
    // validationSchema={validationSchema}
    onSubmit={(values, actions) => onSubmit(values, actions, data)}>
    {({ values, errors }) => {
      return (
        <Form autoComplete="off" noValidate={true} id={id} name={id}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 4,
            }}>
            <fieldset disabled={false} style={{ border: "none", padding: 0 }}>
              <ReactTooltip
                id="tooltip"
                delayHide={500}
                textColor="white"
                backgroundColor="black"
                effect="solid"
                border
                className="tooltip"
                html={true}
              />

              <TextField
                label="Name"
                name="name"
                required
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Class Name of Item to Spawn."
                  />
                )}
              />

              <Text color="white" mb={2}>
                {errors.name}
              </Text>
              <Flex>
                <CheckField
                  label="Is a temporary item?"
                  name="temporaryItem"
                  required
                />
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Nominal"
                    name="nominal"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Number of items spawned in the world at any given time. (Ideal Value) Must be more or equal to min value
                          • Be Carefull changing this number. Too many will bring your server to its knees."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Lifetime"
                    name="lifetime"
                    required
                    type="number"
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Time (In Seconds) before this type of items gets deleted in the world (If no players interact with it)
                          lifetime 604800 (seven days), 3888000 (45 days)."
                      />
                    )}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Restock"
                    name="restock"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="If Value=0, Respawn item type in bulk to reach Nominal Value, If !=0, then Value=Time in seconds to respawn 1 additional item type, until Nominal Value is reached."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Min"
                    name="min"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Minimum number of items of this type in world, Once number falls below minimum, the Restock process begins. (must be less or equal to nominal value)."
                      />
                    )}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Quantmin"
                    name="quantmin"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Minimum % Value for quantity (Rags #, Mag Ammo Value, Ammo Counts), Use -1 if Not Applicable. (less or equal to quantmax value)."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Quantmax"
                    name="quantmax"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Maximum % Value for quantity (Rags #, Mag Ammo Value, Ammo Counts), Use -1 if Not Applicable. (more or equal to quantmin value)."
                      />
                    )}
                  />
                </Box>
              </Flex>

              <TextField
                label="Cost"
                name="cost"
                required
                type="number"
                disabled={values.temporaryItem}
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Priority of Item Spawning in CE queue (100 is default)."
                  />
                )}
              />
              <Flex sx={{ flexDirection: "column" }}>
                <Label>
                  Flags{" "}
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Flags directs the spawner, in what case is must take min and nominal values in to consideration for every item counting for spawning:"
                  />
                </Label>
                <Flex>
                  <CheckField
                    label="count_in_cargo"
                    name="flags.count_in_cargo"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items stored in containers as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="count_in_hoarder"
                    name="flags.count_in_hoarder"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Tents, barrels, undeground stashes (0=False, 1=True)."
                      />
                    )}
                  />
                </Flex>
                <Flex>
                  <CheckField
                    label="count_in_map"
                    name="flags.count_in_map"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items in map as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="count_in_player"
                    name="flags.count_in_player"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items stored in Player Inventory as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                </Flex>
                <Flex>
                  <CheckField
                    label="crafted"
                    name="flags.crafted"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Is the item a crafted item (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="deloot"
                    name="flags.deloot"
                    required
                    tooltip={() => (
                      <Image
                        src="/static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Dynamic event loot objects - helicrashes in majority of cases only by default."
                      />
                    )}
                  />
                </Flex>
              </Flex>
              <SelectField
                placeholder=""
                label="Category"
                name="category"
                required
                options={categories}
                isDisabled={values.temporaryItem}
                isClearable={true}
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Useful for sorting, Internal Category."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Tag"
                name="tag"
                options={tags}
                isDisabled={values.temporaryItem}
                isClearable={true}
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="MUST be AFTER the category."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Usage"
                name="usage"
                options={usages}
                isDisabled={values.temporaryItem}
                isMulti
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Internal Category used in the mpmissions\dayzOffline.chernarusplus\cfgRandomPresets.xml file."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Value"
                name="value"
                required
                options={valuesItems}
                isDisabled={values.temporaryItem}
                isMulti
                tooltip={() => (
                  <Image
                    src="/static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-html={true}
                    data-tip="Used to specify Central Loot Economy Spawning Locations ( More info here: Loot Locations: https://dayz.gamepedia.com/Central_Loot_Economy)."
                  />
                )}
              />
            </fieldset>
            {action}
          </Flex>
        </Form>
      );
    }}
  </Formik>
);

export const EditItemModal = ({
  isOpen,
  onCloseModal,
  form,
  item,
  separatorForm,
  typesForm,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
      <ModalHeader title={`Edit ${title}`} onRequestClose={onCloseModal} />
      <ModalBody>
        {item?.separator && separatorForm(item)}
        {item && !item.separator && typesForm(item)}
      </ModalBody>
      <ModalFooter>
        <Button mt={2} variant="primary" type="submit" form={form}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const RemoveModal = ({ isOpen, onCloseModal, onConfirm, item }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
    <ModalHeader title={`Remove ${item}?`} onRequestClose={onCloseModal} />

    <ModalFooter>
      <Button mt={2} variant="danger" onClick={onConfirm}>
        Remove
      </Button>
    </ModalFooter>
  </Modal>
);

export const RemoveAllModal = ({ isOpen, onCloseModal, onConfirm }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
    <ModalHeader title={`Remove All Items?`} onRequestClose={onCloseModal} />

    <ModalFooter>
      <Button mt={2} variant="danger" onClick={onConfirm}>
        Remove
      </Button>
    </ModalFooter>
  </Modal>
);
