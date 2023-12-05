import { AbilityBuilder, createMongoAbility } from "@casl/ability";

type User = {
  role: "admin" | "manager" | "root";
};

export function defineAbility({ role }: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (role === "root") {
    can("manage", "all");
  }

  return build();
}
