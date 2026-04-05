import { Stack, Text } from "@sanity/ui";
import { set, StringInputProps, useFormValue } from "sanity";
import { useEffect, useRef } from "react";

const TOKEN_REGEX = /\{(lokasi|location|city)\}/gi;

export default function AutoRouteInput(props: StringInputProps) {
  const routePattern = useFormValue(["routePattern"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const computed =
    routePattern && slug ? routePattern.replace(TOKEN_REGEX, slug) : "";
  const lastComputed = useRef<string>("");

  useEffect(() => {
    if (!computed) return;
    const currentValue = typeof props.value === "string" ? props.value : "";
    if (!currentValue || currentValue === lastComputed.current) {
      lastComputed.current = computed;
      props.onChange(set(computed));
    }
  }, [computed, props]);

  return (
    <Stack space={2}>
      <Text size={1} muted>
        Auto route: {computed || "—"} (dari routePattern + slug)
      </Text>
      {props.renderDefault(props)}
    </Stack>
  );
}
