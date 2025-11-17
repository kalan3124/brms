import { IconScooter, IconTrendingUp } from '@tabler/icons-react';

import { currency } from '@/common/currency';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { SectionCardsProps } from '@/types/dashboard/types';

export function SectionCards(props: SectionCardsProps) {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card cursor-pointer">
                <CardHeader>
                    <CardDescription>Total Monthly Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{currency(props.data.monthly)}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                        </Badge>
                    </CardAction>
                </CardHeader>
                {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
            </Card>
            <Card className="@container/card cursor-pointer">
                <CardHeader>
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{currency(props.data.total)}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                        </Badge>
                    </CardAction>
                </CardHeader>
                {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter> */}
            </Card>
            <Card className="@container/card cursor-pointer">
                <CardHeader>
                    <CardDescription>Total Bikes</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{props.data.total_bikes}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconScooter />
                        </Badge>
                    </CardAction>
                    {/* <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction> */}
                </CardHeader>
                {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter> */}
            </Card>
            <Card className="@container/card cursor-pointer">
                <CardHeader>
                    <CardDescription>Available Bikes</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{props.data.available_bikes}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconScooter />
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}
